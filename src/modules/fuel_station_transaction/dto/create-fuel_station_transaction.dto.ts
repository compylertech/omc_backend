import {
  IsNotEmpty,
  IsString,
  IsUUID,
  IsOptional,
  IsNumber,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFuelStationTransactionDto {
  @ApiProperty({ description: 'The UUID of the station service' })
  @IsUUID()
  @IsNotEmpty()
  stationService!: string;

  @ApiProperty({ description: 'The UUID of the customer', required: false })
  @IsUUID()
  @IsOptional()
  customer?: string;

  @ApiProperty({ description: 'The phone number of the customer' })
  @IsString()
  @IsNotEmpty()
  customerPhoneNumber!: string;

  @ApiProperty({ description: 'The date and time of the transaction' })
  @IsDateString()
  @IsNotEmpty()
  transactionDate!: Date;

  @ApiProperty({ description: 'The total amount for the transaction' })
  @IsNumber()
  @IsNotEmpty()
  totalAmount!: number;
}
