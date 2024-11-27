import { Privilege } from 'src/modules/privileges/entities/privileges.entity';
import { Role } from 'src/modules/roles/entities/role.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';

@Entity('role_privilege')
export class RolePrivilege {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @ManyToOne(() => Privilege)
  @JoinColumn({ name: 'privilege_id' })
  privilege: Privilege;

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
    privilege: Privilege,
    created_at: Date = new Date(),
    updated_at: Date,
  ) {
    this.role = role;
    this.privilege = privilege;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
