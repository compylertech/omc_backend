import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../entities/role.entity';
import { Repository } from 'typeorm';
import { Permission } from 'src/modules/permissions/entities/permission.entity';
import { RolePermission } from 'src/modules/role_permission/entities/role_permission.entity';
import { CreateRoleDto } from '../dto/create-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
    @InjectRepository(Permission)
    private permissionsRepository: Repository<Permission>,
    @InjectRepository(RolePermission)
    private rolePermissionsRepository: Repository<RolePermission>,
  ) {}

  /**
   * Create a new role.
   * @param createRoleDto Data Transfer Object for creating a role.
   * @returns The created role entity.
   */
  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const { name, description, privileges } = createRoleDto;

    // Create the role
    const role = this.rolesRepository.create({ name, description });
    await this.rolesRepository.save(role);

    // Find the permissions by their IDs
    const permissions = await this.permissionsRepository.findByIds(privileges);

    // Create role-permission records
    for (const permission of permissions) {
      const rolePermission = this.rolePermissionsRepository.create({
        role,
        privilege: permission,
      });
      await this.rolePermissionsRepository.save(rolePermission);
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
