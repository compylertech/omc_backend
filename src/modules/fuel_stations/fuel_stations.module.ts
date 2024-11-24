import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FuelStation } from './entities/fuel_station.entity';
import { FuelStationsController } from './controller/fuel_stations.controller';
import { FuelStationsService } from './service/fuel_stations.service';
import { FuelStationService } from '../fuel_station_service/entities/fuel_station_service.entity';
import { Service } from '../services/entities/service.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([FuelStation, FuelStationService, Service]),
  ],
  controllers: [FuelStationsController],
  providers: [FuelStationsService],
  exports: [FuelStationsService],
})
export class FuelStationsModule {}
