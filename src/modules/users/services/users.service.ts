import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserRole } from 'src/modules/user_role/entities/user_role.entity';
import { Role } from 'src/modules/roles/entities/role.entity';
import { RolePrivilege } from 'src/modules/role_privilege/entities/role_privilege.entity';
import { Privilege } from 'src/modules/privileges/entities/privileges.entity';
import { PageOptionsDto } from 'src/common/dto/page-optional.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { PageMetaDto } from 'src/common/dto/page-meta.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Role)
    private roleRepository: Repository<Role>,

    @InjectRepository(Privilege)
    private privilegeRepository: Repository<Privilege>,

    @InjectRepository(UserRole)
    private userRoleRepository: Repository<UserRole>,

    @InjectRepository(RolePrivilege)
    private rolePrivilegeRepository: Repository<RolePrivilege>,
  ) {}

  /**
   * Create a new user.
   * @param createUserDto Data Transfer Object for creating a user.
   * @returns The created user entity.
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { firstName, lastName, phoneNumber, email, password, roleIds } =
      createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      firstName,
      lastName,
      phoneNumber,
      email,
      password: hashedPassword,
    });
    await this.userRepository.save(user);

    const roles = await this.roleRepository.findByIds(roleIds);

    for (const role of roles) {
      const rolePrivilege = this.userRoleRepository.create({
        user,
        role,
      });
      await this.userRoleRepository.save(rolePrivilege);
    }
    return user;
  }

  /**
   * Get all users.
   * @returns An array of user entities.
   */
  async findAll(
    pageOptionsDto: PageOptionsDto,
    searchKey?: string,
    userType?: boolean,
  ): Promise<PageDto<User>> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');

    if (searchKey) {
      queryBuilder.andWhere(
        '(user.firstName LIKE :searchKey OR user.lastName LIKE :searchKey OR user.email LIKE :searchKey OR user.phoneNumber LIKE :searchKey)',
        { searchKey: `%${searchKey}%` },
      );
    }

    if (userType !== undefined) {
      queryBuilder.andWhere('user.isActive = :userType', { userType });
    }

    queryBuilder
      .orderBy('user.createdAt', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.limit);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  /**
   * Get a single user by ID.
   * @param userId The ID of the user.
   * @returns The user entity.
   */
  async findOne(userId: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return user;
  }

  /**
   * Update a user by ID.
   * @param userId The ID of the user.
   * @param updateUserDto Data Transfer Object for updating a user.
   * @returns The updated user entity.
   */
  async update(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(userId);
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  /**
   * Delete a user by ID.
   * @param userId The ID of the user.
   * @returns An object indicating success.
   */
  async remove(userId: string): Promise<{ deleted: boolean }> {
    const result = await this.userRepository.delete(userId);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return { deleted: true };
  }

  /**
   * Find a user by email.
   * @param email The email address of the user.
   * @returns The user entity or null if not found.
   */
  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      return null;
    }
    return user;
  }
}
