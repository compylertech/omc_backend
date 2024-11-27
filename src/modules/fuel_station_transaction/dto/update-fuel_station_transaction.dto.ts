import { PartialType } from '@nestjs/swagger';
import { CreateFuelStationTransactionDto } from './create-fuel_station_transaction.dto';

export class UpdateFuelStationTransactionDto extends PartialType(CreateFuelStationTransactionDto) {}
