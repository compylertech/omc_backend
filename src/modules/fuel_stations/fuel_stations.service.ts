import { Injectable } from '@nestjs/common';
import { CreateFuelStationDto } from './dto/create-fuel_station.dto';
import { UpdateFuelStationDto } from './dto/update-fuel_station.dto';

@Injectable()
export class FuelStationsService {
  create(createFuelStationDto: CreateFuelStationDto) {
    return 'This action adds a new fuelStation';
  }

  findAll() {
    return `This action returns all fuelStations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fuelStation`;
  }

  update(id: number, updateFuelStationDto: UpdateFuelStationDto) {
    return `This action updates a #${id} fuelStation`;
  }

  remove(id: number) {
    return `This action removes a #${id} fuelStation`;
  }
}
