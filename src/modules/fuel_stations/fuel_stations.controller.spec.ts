import { Test, TestingModule } from '@nestjs/testing';
import { FuelStationsController } from './fuel_stations.controller';
import { FuelStationsService } from './fuel_stations.service';

describe('FuelStationsController', () => {
  let controller: FuelStationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FuelStationsController],
      providers: [FuelStationsService],
    }).compile();

    controller = module.get<FuelStationsController>(FuelStationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
