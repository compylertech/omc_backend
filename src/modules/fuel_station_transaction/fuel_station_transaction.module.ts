import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FuelStationTransaction } from './entities/fuel_station_transaction.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { FuelStationTransactionController } from './controller/fuel_station_transaction.controller';
import { FuelStationTransactionService } from './service/fuel_station_transaction.service';
import { FuelStationService } from '../fuel_station_service/entities/fuel_station_service.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FuelStationTransaction,
      FuelStationService,
      User,
    ]),
  ],
  controllers: [FuelStationTransactionController],
  providers: [FuelStationTransactionService],
  exports: [FuelStationTransactionService],
})
export class FuelStationTransactionModule {}
