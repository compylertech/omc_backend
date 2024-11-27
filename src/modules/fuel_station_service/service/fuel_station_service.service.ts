import { Injectable } from '@nestjs/common';

@Injectable()
export class FuelStationServiceService {
  // create(createFuelStationServiceDto: CreateFuelStationServiceDto) {
  //   return 'This action adds a new fuelStationService';
  // }

  findAll() {
    return `This action returns all fuelStationService`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fuelStationService`;
  }

  // update(id: number, updateFuelStationServiceDto: UpdateFuelStationServiceDto) {
  //   return `This action updates a #${id} fuelStationService`;
  // }

  remove(id: number) {
    return `This action removes a #${id} fuelStationService`;
  }
}
