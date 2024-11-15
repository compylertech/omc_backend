import { Module } from '@nestjs/common';
import { FuelStationTransactionService } from './fuel_station_transaction.service';
import { FuelStationTransactionController } from './fuel_station_transaction.controller';

@Module({
  controllers: [FuelStationTransactionController],
  providers: [FuelStationTransactionService],
})
export class FuelStationTransactionModule {}
