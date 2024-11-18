import { Test, TestingModule } from '@nestjs/testing';
import { FuelStationServiceService } from './fuel_station_service.service';

describe('FuelStationServiceService', () => {
  let service: FuelStationServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FuelStationServiceService],
    }).compile();

    service = module.get<FuelStationServiceService>(FuelStationServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
