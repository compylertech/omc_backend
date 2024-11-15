import { PartialType } from '@nestjs/swagger';
import { CreateFuelStationServiceDto } from './create-fuel_station_service.dto';

export class UpdateFuelStationServiceDto extends PartialType(CreateFuelStationServiceDto) {}
