import { RoleType } from 'src/utils/enums';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: RoleType })
  roleType: RoleType;

  @Column({ default: new Date() })
  createdAt: Date;

  constructor(
    name: string,
    roleType: RoleType,
    description: string,
    createdAt: Date = new Date(),
  ) {
    this.name = name;
    this.description = description;
    this.roleType = roleType;
    this.createdAt = createdAt;
  }
}
