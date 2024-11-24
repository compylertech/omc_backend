import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FuelStationTransactionService } from '../service/fuel_station_transaction.service';
import { CreateFuelStationTransactionDto } from '../dto/create-fuel_station_transaction.dto';
import { UpdateFuelStationTransactionDto } from '../dto/update-fuel_station_transaction.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Transactions')
@ApiBearerAuth()
@Controller('fuel-station-transaction')
export class FuelStationTransactionController {
  constructor(
    private readonly fuelStationTransactionService: FuelStationTransactionService,
  ) {}

  @Post()
  create(
    @Body() createFuelStationTransactionDto: CreateFuelStationTransactionDto,
  ) {
    return this.fuelStationTransactionService.create(
      createFuelStationTransactionDto,
    );
  }

  @Get()
  findAll() {
    return this.fuelStationTransactionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fuelStationTransactionService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFuelStationTransactionDto: UpdateFuelStationTransactionDto,
  ) {
    return this.fuelStationTransactionService.update(
      id,
      updateFuelStationTransactionDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fuelStationTransactionService.remove(id);
  }
}
