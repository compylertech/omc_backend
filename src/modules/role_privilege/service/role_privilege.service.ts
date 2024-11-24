import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Privilege } from 'src/modules/privileges/entities/privileges.entity';
import { Repository } from 'typeorm';
import { RolePrivilege } from '../entities/role_privilege.entity';
@Injectable()
export class RolePrivilegeService {
  constructor(
    @InjectRepository(RolePrivilege)
    private rolePrivilegeRepository: Repository<RolePrivilege>,
  ) {}
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

  getRolePrivileges(roleId: string): Promise<{ privileges: Privilege[] }> {
    return this.rolePrivilegeRepository
      .createQueryBuilder('role_privilege')
      .leftJoinAndSelect('role_privilege.privilege', 'privilege')
      .where('role_privilege.role_id = :roleId', { roleId })
      .getMany()
      .then((rolePrivileges) => ({
        privileges: rolePrivileges.map(
          (rolePrivilege) => rolePrivilege.privilege,
        ),
      }));
  }
}
