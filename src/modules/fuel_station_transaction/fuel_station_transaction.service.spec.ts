import { Test, TestingModule } from '@nestjs/testing';
import { FuelStationTransactionService } from './fuel_station_transaction.service';

describe('FuelStationTransactionService', () => {
  let service: FuelStationTransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FuelStationTransactionService],
    }).compile();

    service = module.get<FuelStationTransactionService>(FuelStationTransactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
