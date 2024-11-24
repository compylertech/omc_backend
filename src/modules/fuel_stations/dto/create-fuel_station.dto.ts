import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEmail,
  IsUUID,
  IsArray,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFuelStationDto {
  @ApiProperty({ description: 'The legal name of the fuel station' })
  @IsString()
  @IsNotEmpty()
  legalName!: string;

  @ApiProperty({ description: 'The registration name of the fuel station' })
  @IsString()
  @IsNotEmpty()
  registrationName!: string;

  @ApiProperty({ description: 'The registration number of the fuel station' })
  @IsString()
  @IsNotEmpty()
  registrationNumber!: string;

  @ApiProperty({ description: 'The state where the fuel station is located' })
  @IsString()
  @IsNotEmpty()
  state!: string;

  @ApiProperty({ description: 'The city where the fuel station is located' })
  @IsString()
  @IsNotEmpty()
  city!: string;

  @ApiProperty({ description: 'The street address of the fuel station' })
  @IsString()
  @IsNotEmpty()
  streetAddress!: string;

  @ApiProperty({ description: 'The PO Box of the fuel station' })
  @IsString()
  @IsNotEmpty()
  pobox!: string;

  @ApiProperty({
    description: 'The email of the fuel station',
    required: false,
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ description: 'The phone number of the fuel station' })
  @IsString()
  @IsNotEmpty()
  phoneNumber!: string;

  @ApiProperty({ description: 'The UUID of the manager', required: false })
  @IsUUID()
  @IsNotEmpty()
  manager!: string;

  @ApiProperty({
    description: 'An array of service IDs that the fuel station provides',
    required: false,
  })
  @IsArray()
  @IsUUID('all', { each: true })
  @IsOptional()
  services?: string[];
}
