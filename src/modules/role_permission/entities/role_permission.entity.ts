import { Permission } from 'src/modules/permissions/entities/permission.entity';
import { Role } from 'src/modules/roles/entities/role.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';

@Entity('role_permission')
export class RolePermission {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'user_id' })
  role: Role;

  @ManyToOne(() => Permission)
  @JoinColumn({ name: 'permission_id' })
  privilege: Permission;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  constructor(
    role: Role,
    privilege: Permission,
    created_at: Date = new Date(),
    updated_at: Date,
  ) {
    this.role = role;
    this.privilege = privilege;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
