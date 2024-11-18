import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePermissionDto {
  @ApiProperty({ description: 'The name of the privilege' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ description: 'The description of the privilege' })
  @IsString()
  description!: string;
}
