import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RoleType } from 'src/utils/enums';

export class CreateRoleDto {
  @ApiProperty({ description: 'The first name of the user' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ description: 'The last name of the user' })
  @IsString()
  @IsNotEmpty()
  description!: string;

  @ApiProperty({ description: 'The type of the role', enum: RoleType })
  @IsEnum(RoleType)
  @IsNotEmpty()
  roleType!: RoleType;

  @ApiProperty({ description: 'An array of privilege IDs' })
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  privileges!: string[];
}
