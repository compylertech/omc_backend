import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  first_name?: string;
  @ApiProperty()
  last_name?: string;
  @ApiProperty()
  phone_number: string;
  @ApiProperty()
  email: string;
}
