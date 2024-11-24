import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Service } from 'src/modules/services/entities/service.entity';
import { FuelStation } from 'src/modules/fuel_stations/entities/fuel_station.entity';

@Entity('fuel_station_service')
export class FuelStationService {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Service, { nullable: false })
  service: Service;

  @ManyToOne(() => FuelStation, { nullable: false })
  station: FuelStation;

  @Column({ type: 'boolean', default: true })
  availability: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  constructor(
    service: Service,
    station: FuelStation,
    availability: boolean = true,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date(),
  ) {
    this.service = service;
    this.station = station;
    this.availability = availability;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
