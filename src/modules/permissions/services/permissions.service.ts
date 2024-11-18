import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { Permission } from '../entities/permission.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  /**
   * Create a new permission.
   * @param createPermissionDto Data Transfer Object for creating a permission.
   * @returns The created permission entity.
   */
  async create(createPermissionDto: CreatePermissionDto): Promise<Permission> {
    const permission = this.permissionRepository.create(createPermissionDto);
    return this.permissionRepository.save(permission);
  }

  /**
   * Get all permissions.
   * @returns An array of permission entities.
   */
  async findAll(): Promise<Permission[]> {
    return this.permissionRepository.find();
  }

  /**
   * Get a single permission by ID.
   * @param permissionId The ID of the permission.
   * @returns The permission entity.
   */
  async findOne(permissionId: string): Promise<Permission> {
    const permission = await this.permissionRepository.findOneBy({
      id: permissionId,
    });
    if (!permission) {
      throw new NotFoundException(
        `Permission with ID ${permissionId} not found`,
      );
    }
    return permission;
  }

  /**
   * Delete a permissions by ID.
   * @param permissionId The ID of the permission.
   * @returns An object indicating success.
   */
  async remove(permissionId: string): Promise<{ deleted: boolean }> {
    const result = await this.permissionRepository.delete(permissionId);
    if (result.affected === 0) {
      throw new NotFoundException(
        `Permission with ID ${permissionId} not found`,
      );
    }
    return { deleted: true };
  }
}
