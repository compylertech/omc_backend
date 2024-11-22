import { ServiceType } from 'src/utils/enums';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('services')
export class Service {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', nullable: false })
  serviceName: string;

  @Column({ type: 'enum', enum: ServiceType, nullable: false })
  serviceType: ServiceType;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  constructor(
    serviceName: string,
    serviceType: ServiceType,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date(),
  ) {
    this.serviceName = serviceName;
    this.serviceType = serviceType;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
