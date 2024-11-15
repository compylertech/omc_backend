import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'The name of the user' })
  @IsString()
    @IsNotEmpty()
    firstName!: string;

  @ApiProperty({ description: 'The email of the user' })
  @IsEmail()
    email!: string;

  @ApiProperty({ description: 'The password of the user' })
  @IsString()
    @IsNotEmpty()
    password!: string;
}
