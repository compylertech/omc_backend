import { Module } from '@nestjs/common';
import { FuelStationServiceService } from './service/fuel_station_service.service';

@Module({
  controllers: [],
  providers: [FuelStationServiceService],
})
export class FuelStationServiceModule {}
