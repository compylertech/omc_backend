import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/modules/roles/entities/role.entity';
import { UserRole } from '../entities/user_role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserRoleService {
  constructor(
    @InjectRepository(UserRole)
    private userRoleRepository: Repository<UserRole>,
  ) {}

  // create(createUserRoleDto: CreateUserRoleDto) {
  //   return 'This action adds a new userRole';
  // }

  findAll() {
    return `This action returns all userRole`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userRole`;
  }

  // update(id: number, updateUserRoleDto: UpdateUserRoleDto) {
  //   return `This action updates a #${id} userRole`;
  // }

  remove(id: number) {
    return `This action removes a #${id} userRole`;
  }

  getUserRoles(userId: string): Promise<Role[]> {
    return this.userRoleRepository
      .createQueryBuilder('user_role')
      .leftJoinAndSelect('user_role.role', 'role')
      .where('user_role.user_id = :userId', { userId })
      .getMany()
      .then((userRoles) => userRoles.map((userRole) => userRole.role));
  }
}
