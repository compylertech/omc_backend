import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CreateFuelStationDto } from '../dto/create-fuel_station.dto';
import { UpdateFuelStationDto } from '../dto/update-fuel_station.dto';
import { FuelStation } from '../entities/fuel_station.entity';
import { FuelStationsService } from '../service/fuel_stations.service';

@ApiTags('fuel-stations')
@ApiBearerAuth()
@Controller('fuel-stations')
export class FuelStationsController {
  constructor(private readonly fuelStationsService: FuelStationsService) {}

  @Post()
  create(
    @Body() createFuelStationDto: CreateFuelStationDto,
  ): Promise<FuelStation> {
    return this.fuelStationsService.create(createFuelStationDto);
  }

  @Get()
  findAll(): Promise<FuelStation[]> {
    return this.fuelStationsService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 404, description: 'Fuel station not found.' })
  findOne(@Param('id') id: string): Promise<FuelStation> {
    return this.fuelStationsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateFuelStationDto: UpdateFuelStationDto,
  ): Promise<FuelStation> {
    return this.fuelStationsService.update(id, updateFuelStationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.fuelStationsService.remove(id);
  }
}
