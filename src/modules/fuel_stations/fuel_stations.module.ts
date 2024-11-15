import { Module } from '@nestjs/common';
import { FuelStationsService } from './fuel_stations.service';
import { FuelStationsController } from './fuel_stations.controller';

@Module({
  controllers: [FuelStationsController],
  providers: [FuelStationsService],
})
export class FuelStationsModule {}
