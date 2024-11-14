import { Test, TestingModule } from '@nestjs/testing';
import { FuelStationServiceController } from './fuel_station_service.controller';
import { FuelStationServiceService } from './fuel_station_service.service';

describe('FuelStationServiceController', () => {
  let controller: FuelStationServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FuelStationServiceController],
      providers: [FuelStationServiceService],
    }).compile();

    controller = module.get<FuelStationServiceController>(FuelStationServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
