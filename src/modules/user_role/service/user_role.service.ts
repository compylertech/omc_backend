import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRoleService {
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
}
