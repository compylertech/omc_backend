import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { FuelStationService } from 'src/modules/fuel_station_service/entities/fuel_station_service.entity';

@Entity('fuel_station_transaction')
export class FuelStationTransaction {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => FuelStationService, { nullable: false })
  stationService: FuelStationService;

  @ManyToOne(() => User, { nullable: true })
  customer!: User;

  @Column({ type: 'varchar', nullable: false })
  customerPhoneNumber: string;

  @Column({ type: 'timestamp', nullable: false })
  transactionDate: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  totalAmount: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  constructor(
    stationService: FuelStationService,
    customer: User,
    customerPhoneNumber: string,
    transactionDate: Date,
    totalAmount: number,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date(),
  ) {
    this.stationService = stationService;
    this.customer = customer;
    this.customerPhoneNumber = customerPhoneNumber;
    this.transactionDate = transactionDate;
    this.totalAmount = totalAmount;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
