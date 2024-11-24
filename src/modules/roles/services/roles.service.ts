import { Injectable, NotFoundException } from '@nestjs/common';
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
    const {
      name,
      description,
      roleType,
      privileges: privilegeIds,
    } = createRoleDto;

    const role = this.rolesRepository.create({ name, description, roleType });
    await this.rolesRepository.save(role);

    const privileges = await this.privilegesRepository.findByIds(privilegeIds);

    for (const privilege of privileges) {
      const rolePrivilege = this.rolePrivilegesRepository.create({
        role,
        privilege: privilege,
      });
      await this.rolePrivilegesRepository.save(rolePrivilege);
    }

    return role;
  }

  /**
   * Get a role by its name.
   * @param name The name of the role.
   * @returns The role entity.
   */
  async getRoleByName(name: string): Promise<Role> {
    const role = await this.rolesRepository.findOne({ where: { name } });
    if (!role) {
      throw new NotFoundException(`Role with name ${name} not found`);
    }
    return role;
  }

  /**
   * Get all roles from the repository.
   * @returns {Promise<Role[]>} A promise that resolves to an array of Role objects.
   */
  async findAll(): Promise<Role[]> {
    return this.rolesRepository.find();
  }

  /**
   * Get a role by its ID.
   * @param {string} id - The ID of the role to retrieve.
   * @returns {Promise<Role>} A promise that resolves to the role with the specified ID.
   * @throws {NotFoundException} If no role with the specified ID is found.
   */
  async findOne(id: string): Promise<Role> {
    const role = await this.rolesRepository.findOne({ where: { id } });
    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }
    return role;
  }

  // async update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role> {
  //   const { name, description, privileges } = updateRoleDto;

  //   const role = await this.rolesRepository.findOne({ where: { id } });
  //   if (!role) {
  //     throw new NotFoundException(`Role with ID ${id} not found`);
  //   }

  //   if (name) {
  //     role.name = name;
  //   }
  //   if (description) {
  //     role.description = description;
  //   }
  //   await this.rolesRepository.save(role);

  //   // Update role-privilege records
  //   await this.rolePrivilegesRepository.delete({ role });

  //   const privilegesDetails = privileges
  //     ? await this.privilegesRepository.findByIds(privileges)
  //     : [];
  //   for (const privilege of privilegesDetails) {
  //     const rolePermission = this.rolePrivilegesRepository.create({
  //       role,
  //       privilege,
  //     });
  //     await this.rolePrivilegesRepository.save(rolePermission);
  //   }

  //   return role;
  // }

  /**
   * Removes a role by its ID.
   * @param id - The ID of the role to be removed.
   * @returns A promise that resolves when the role is removed.
   * @throws `NotFoundException` if the role with the specified ID is not found.
   */
  async remove(id: string): Promise<void> {
    const role = await this.rolesRepository.findOne({ where: { id } });
    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }
    await this.rolesRepository.remove(role);
  }

  /**
   * Get all privileges associated with a role.
   * @param roleId The ID of the role.
   * @returns A promise that resolves to an array of Privilege objects.
   */
  async getUserRoles(userId: string): Promise<Role[]> {
    return this.rolesRepository
      .createQueryBuilder('role')
      .innerJoin('role.users', 'user', 'user.id = :userId', { userId })
      .leftJoinAndSelect('role.privileges', 'privilege')
      .getMany();
  }
}