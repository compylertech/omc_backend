import { PartialType } from '@nestjs/swagger';
import { CreateFuelStationDto } from './create-fuel_station.dto';

export class UpdateFuelStationDto extends PartialType(CreateFuelStationDto) {}
