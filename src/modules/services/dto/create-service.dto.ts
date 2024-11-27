import { IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ServiceType } from 'src/utils/enums';

export class CreateServiceDto {
  @ApiProperty({ description: 'The name of the service' })
  @IsString()
  @IsNotEmpty()
  serviceName!: string;

  @ApiProperty({ description: 'The type of the service', enum: ServiceType })
  @IsEnum(ServiceType)
  @IsNotEmpty()
  serviceType!: ServiceType;

  @ApiProperty({
    description: 'The description of the service',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}
