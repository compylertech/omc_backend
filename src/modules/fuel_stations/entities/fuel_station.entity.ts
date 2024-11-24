import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';

@Entity('fuel_stations')
export class FuelStation {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({ type: 'varchar', nullable: false })
  legalName: string;

  @Column({ type: 'varchar', nullable: false })
  registrationName: string;

  @Column({ type: 'varchar', nullable: false })
  registrationNumber: string;

  @Column({ type: 'varchar', nullable: false })
  state: string;

  @Column({ type: 'varchar', nullable: false })
  city: string;

  @Column({ type: 'varchar', nullable: false })
  streetAddress: string;

  @Column({ type: 'varchar', nullable: false })
  pobox: string;

  @Column({ type: 'varchar', nullable: true })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  phoneNumber: string;

  @ManyToOne(() => User, { nullable: false })
  manager: User;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  constructor(
    legalName: string,
    registrationName: string,
    registrationNumber: string,
    state: string,
    city: string,
    streetAddress: string,
    pobox: string,
    email: string,
    phoneNumber: string,
    manager: User,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date(),
  ) {
    this.legalName = legalName;
    this.registrationName = registrationName;
    this.registrationNumber = registrationNumber;
    this.state = state;
    this.city = city;
    this.streetAddress = streetAddress;
    this.pobox = pobox;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.manager = manager;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
