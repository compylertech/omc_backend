import { Injectable } from '@nestjs/common';
import { CreateFuelStationTransactionDto } from './dto/create-fuel_station_transaction.dto';
import { UpdateFuelStationTransactionDto } from './dto/update-fuel_station_transaction.dto';

@Injectable()
export class FuelStationTransactionService {
  create(createFuelStationTransactionDto: CreateFuelStationTransactionDto) {
    return 'This action adds a new fuelStationTransaction';
  }

  findAll() {
    return `This action returns all fuelStationTransaction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fuelStationTransaction`;
  }

  update(id: number, updateFuelStationTransactionDto: UpdateFuelStationTransactionDto) {
    return `This action updates a #${id} fuelStationTransaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} fuelStationTransaction`;
  }
}
