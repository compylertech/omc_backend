import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDTO {
  @ApiProperty({ description: 'The email or phone number of the user' })
  @IsString()
  @IsNotEmpty()
  emailOrPhoneNumber!: string;

  @ApiProperty({ description: 'The password of the user' })
  @IsString()
  @IsNotEmpty()
  password!: string;
}
