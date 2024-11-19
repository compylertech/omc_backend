import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../entities/role.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from '../dto/create-role.dto';
import { Privilege } from 'src/modules/privileges/entities/privileges.entity';
import { RolePrivilege } from 'src/modules/role_privilege/entities/role_privilege.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
    @InjectRepository(Privilege)
    private privilegesRepository: Repository<Privilege>,
    @InjectRepository(RolePrivilege)
    private rolePrivilegesRepository: Repository<RolePrivilege>,
  ) {}

  /**
   * Create a new role.
   * @param createRoleDto Data Transfer Object for creating a role.
   * @returns The created role entity.
   */
  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const { name, description, privileges: privilegeIds } = createRoleDto;

    // Create the role
    const role = this.rolesRepository.create({ name, description });
    await this.rolesRepository.save(role);

    // Find the privileges by their IDs
    const privileges = await this.privilegesRepository.findByIds(privilegeIds);

    // Create role-privilege records
    for (const privilege of privileges) {
      const rolePrivilege = this.rolePrivilegesRepository.create({
        role,
        privilege: privilege,
      });
      await this.rolePrivilegesRepository.save(rolePrivilege);
    }

    return role;
  }

  findAll() {
    return `This action returns all roles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  // update(id: number, updateRoleDto: UpdateRoleDto) {
  //   return `This action updates a #${id} role`;
  // }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
