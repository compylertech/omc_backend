import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePrivilegeDto } from '../dto/create-privilege.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Privilege } from '../entities/privileges.entity';

@Injectable()
export class PrivilegesService {
  constructor(
    @InjectRepository(Privilege)
    private readonly privilegeRepository: Repository<Privilege>,
  ) {}

  /**
   * Create a new privilege.
   * @param createPrivilegeDto Data Transfer Object for creating a privilege.
   * @returns The created privilege entity.
   */
  async create(createPrivilegeDto: CreatePrivilegeDto): Promise<Privilege> {
    const privilege = this.privilegeRepository.create(createPrivilegeDto);
    return this.privilegeRepository.save(privilege);
  }

  /**
   * Get all privileges.
   * @returns An array of privilege entities.
   */
  async findAll(): Promise<Privilege[]> {
    return this.privilegeRepository.find();
  }

  /**
   * Get a single privilege by ID.
   * @param privilegeId The ID of the privilege.
   * @returns The privilege entity.
   */
  async findOne(privilegeId: string): Promise<Privilege> {
    const privilege = await this.privilegeRepository.findOneBy({
      id: privilegeId,
    });
    if (!privilege) {
      throw new NotFoundException(`privilege with ID ${privilegeId} not found`);
    }
    return privilege;
  }

  /**
   * Delete a privileges by ID.
   * @param privilegeId The ID of the privilege.
   * @returns An object indicating success.
   */
  async remove(privilegeId: string): Promise<{ deleted: boolean }> {
    const result = await this.privilegeRepository.delete(privilegeId);
    if (result.affected === 0) {
      throw new NotFoundException(`privilege with ID ${privilegeId} not found`);
    }
    return { deleted: true };
  }
}
