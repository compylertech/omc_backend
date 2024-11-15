import { Test, TestingModule } from '@nestjs/testing';
import { FuelStationTransactionController } from './fuel_station_transaction.controller';
import { FuelStationTransactionService } from './fuel_station_transaction.service';

describe('FuelStationTransactionController', () => {
  let controller: FuelStationTransactionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FuelStationTransactionController],
      providers: [FuelStationTransactionService],
    }).compile();

    controller = module.get<FuelStationTransactionController>(FuelStationTransactionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
