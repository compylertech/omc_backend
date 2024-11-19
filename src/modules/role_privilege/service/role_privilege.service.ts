import { Injectable } from '@nestjs/common';
@Injectable()
export class RolePrivilegeService {
  // create(createRoleprivilegeDto: CreateRoleprivilegeDto) {
  //   return 'This action adds a new roleprivilege';
  // }

  findAll() {
    return `This action returns all roleprivilege`;
  }

  findOne(id: number) {
    return `This action returns a #${id} roleprivilege`;
  }

  // update(id: number, updateRoleprivilegeDto: UpdateRoleprivilegeDto) {
  //   return `This action updates a #${id} roleprivilege`;
  // }

  remove(id: number) {
    return `This action removes a #${id} roleprivilege`;
  }
}
