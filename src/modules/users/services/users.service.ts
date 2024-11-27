import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserRole } from 'src/modules/user_role/entities/user_role.entity';
import { Role } from 'src/modules/roles/entities/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserRole)
    private userRoleRepository: Repository<UserRole>,
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  /**
   * Create a new user.
   * @param createUserDto Data Transfer Object for creating a user.
   * @returns The created user entity.
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { firstName, lastName, phoneNumber, email, password, roleId } =
      createUserDto;
    const user = this.userRepository.create({
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
    });
    await this.userRepository.save(user);

    const role = await this.rolesRepository.findOneBy({ id: roleId });
    if (!role) {
      throw new NotFoundException(`Role with ID ${roleId} not found`);
    }

    const userRole = this.userRoleRepository.create({ user, role });
    await this.userRoleRepository.save(userRole);
    return user;
  }

  /**
   * Get all users.
   * @returns An array of user entities.
   */
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
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
    const user = await this.findOne(userId); // Ensures the user exists
    Object.assign(user, updateUserDto); // Update fields
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
