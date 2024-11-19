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

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
    private usersService: UsersService,
    private roleService: RolesService,
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
      roleId: customerRole.id,
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
      const payload = { user: user };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
