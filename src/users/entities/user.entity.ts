import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { File } from '../../files/entities/file.entity';

@Entity('users')
@Unique(['email'])
@Unique(['phone_number'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  first_name: string;

  @Column({ type: 'varchar', nullable: false })
  last_name: string;

  @Column({ type: 'varchar', nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  phone_number: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @ManyToOne(() => File, { nullable: true })
  @JoinColumn({ name: 'profile_picture' })
  profile_picture: File;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
