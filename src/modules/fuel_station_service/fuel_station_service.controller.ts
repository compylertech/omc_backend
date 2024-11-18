import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FuelStationServiceService } from './fuel_station_service.service';
import { CreateFuelStationServiceDto } from './dto/create-fuel_station_service.dto';
import { UpdateFuelStationServiceDto } from './dto/update-fuel_station_service.dto';

@Controller('fuel-station-service')
export class FuelStationServiceController {
  constructor(private readonly fuelStationServiceService: FuelStationServiceService) {}

  @Post()
  create(@Body() createFuelStationServiceDto: CreateFuelStationServiceDto) {
    return this.fuelStationServiceService.create(createFuelStationServiceDto);
  }

  @Get()
  findAll() {
    return this.fuelStationServiceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fuelStationServiceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFuelStationServiceDto: UpdateFuelStationServiceDto) {
    return this.fuelStationServiceService.update(+id, updateFuelStationServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fuelStationServiceService.remove(+id);
  }
}
