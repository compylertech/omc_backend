import { Test, TestingModule } from '@nestjs/testing';
import { FuelStationsService } from './fuel_stations.service';

describe('FuelStationsService', () => {
  let service: FuelStationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FuelStationsService],
    }).compile();

    service = module.get<FuelStationsService>(FuelStationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
