import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { Repository } from 'typeorm';
import { SignInDTO } from '../dto/siginin.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignUpDTO } from '../dto/signup.dto';
import { UsersService } from 'src/modules/users/services/users.service';
import { RolesService } from 'src/modules/roles/services/roles.service';
import * as nodemailer from 'nodemailer';
import { UserRoleService } from 'src/modules/user_role/service/user_role.service';
import { RolePrivilegeService } from 'src/modules/role_privilege/service/role_privilege.service';

@Injectable()
export class AuthService {
  private otpStore: Map<string, { otp: number, expiresAt: Date }> = new Map();

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
    private usersService: UsersService,
    private roleService: RolesService,
    private userRoleService: UserRoleService,
    private rolePrivilege: RolePrivilegeService,
  ) {}

  /**
   * Sign up a new user.
   * @param signUpDTO Data Transfer Object for signing up.
   * @returns The created user or an error message.
   */
  async signUp(signUpDto: SignUpDTO) {
    const sameUser = await this.usersService.findByEmail(signUpDto.email);
    if (sameUser) return { message: 'User already exists' };

    const hashedPassword = await bcrypt.hash(signUpDto.password, 10);
    const customerRole = await this.roleService.getRoleByName('CUSTOMER');

    return this.usersService.create({
      ...signUpDto,
      password: hashedPassword,
      roleIds: [customerRole.id],
    });
  }

  /**
   * Sign in a user and generate a JWT token.
   * @param signInDto Data Transfer Object for signing in.
   * @returns The JWT token.
   */
  async signIn(signInDto: SignInDTO): Promise<{ accessToken: string }> {
    const { emailOrPhoneNumber, password } = signInDto;
    const user = await this.usersRepository.findOne({
      where: [
        { email: emailOrPhoneNumber },
        { phoneNumber: emailOrPhoneNumber },
      ],
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      const userRoles = await this.userRoleService.getUserRoles(user.id);

      const rolesWithPrivileges = await Promise.all(
        userRoles.map(async (role) => ({
          id: role.id,
          name: role.name,
          roleType: role.roleType,
          privileges: (
            await this.rolePrivilege.getRolePrivileges(role.id)
          ).privileges.map((privilege) => ({
            id: privilege.id,
            name: privilege.name,
            description: privilege.description,
          })),
        })),
      );

      const payload = {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          roles: rolesWithPrivileges,
        },
      };

      const accessToken = this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async sendOtpEmail(email: string, otp: string): Promise<void> {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}. It will expire in 10 minutes.`,
    };

    await transporter.sendMail(mailOptions);
  }

  async generateResetPasswordOTP(email: string): Promise<{ message: string }> {
    const user = await this.usersService.findByEmail(email);
    if (!user) return { message: 'User not found' };

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    this.otpStore.set(email, { otp: parseInt(otp), expiresAt });

    await this.sendOtpEmail(user.email, otp);
    return { message: 'OTP generated and sent to email' };
  }

  async forgotPassword(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) return { message: 'User not found' };
    await this.generateResetPasswordOTP(email);
  }
  
  async verifyResetPasswordOTP(email: string, otp: number): Promise<boolean> {
    const otpData = this.otpStore.get(email);
    if (!otpData) return false;

    const isOtpValid = otpData.otp === otp && otpData.expiresAt > new Date();
    return isOtpValid;
  }

  async resetPassword(userId: string, newPassword: string, confirmPassword: string) {
    if (newPassword !== confirmPassword) return { message: 'Passwords do not match' };

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.usersService.update(userId, { password: hashedPassword });
  }
}
