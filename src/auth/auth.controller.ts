import { Controller, Body, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { SignInDto } from './dto/signin.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'User Login' })
  @ApiResponse({
    status: 200,
    description: 'The record found',
    type: [CreateUserDto],
  })
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  @ApiOperation({ summary: 'User Signup' })
  @ApiResponse({
    status: 200,
    description: 'The record found',
    type: [CreateUserDto],
  })
  signUp(@Body() signUpDto: CreateUserDto) {
    const payload = {
      first_name: signUpDto.first_name,
      last_name: signUpDto.last_name,
      phone_number: signUpDto.phone_number,
      email: signUpDto.email,
      password: signUpDto.password,
    };
    return this.authService.signUp(payload);
  }
}
