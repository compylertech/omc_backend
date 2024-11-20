import { Body, Controller, Post } from '@nestjs/common';
import { SignUpDTO } from '../dto/signup.dto';
import { ApiBody } from '@nestjs/swagger';
import { AuthService } from '../service/auth.service';
import { SignInDTO } from '../dto/siginin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiBody({ type: SignUpDTO })
  async signUp(@Body() signUpDto: SignUpDTO) {
    return this.authService.signUp(signUpDto);
  }

  @Post('signin')
  async signIn(@Body() signInDto: SignInDTO): Promise<{ accessToken: string }> {
    return this.authService.signIn(signInDto);
  }
}
