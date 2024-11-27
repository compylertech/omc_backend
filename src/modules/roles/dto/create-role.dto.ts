import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({ description: 'The first name of the user' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ description: 'The last name of the user' })
  @IsString()
  @IsNotEmpty()
  description!: string;

  @ApiProperty({ description: 'An array of privilege IDs' })
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  privileges!: string[];
}
