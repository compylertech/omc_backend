import { Module } from '@nestjs/common';
import { FuelStationServiceService } from './fuel_station_service.service';
import { FuelStationServiceController } from './fuel_station_service.controller';

@Module({
  controllers: [FuelStationServiceController],
  providers: [FuelStationServiceService],
})
export class FuelStationServiceModule {}
