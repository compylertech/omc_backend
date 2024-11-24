import { Body, Controller, Post } from '@nestjs/common';
import { SignUpDTO } from '../dto/signup.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
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

  @Post('forgot-password')
  @ApiOperation({ summary: 'Generate OTP for password reset' })
  @ApiBody({ schema: { type: 'object', properties: { email: { type: 'string' } } } })
  @ApiResponse({ status: 200, description: 'OTP generated and sent to email.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async forgotPassword(@Body() email: string) {
    return this.authService.forgotPassword(email);
  }

  @Post('verify-otp')
  @ApiOperation({ summary: 'Verify OTP for password reset' })
  @ApiBody({ schema: { type: 'object', properties: { email: { type: 'string' }, otp: { type: 'string' } } } })
  @ApiResponse({ status: 200, description: 'OTP verified.' })
  @ApiResponse({ status: 400, description: 'Invalid OTP or expired.' })
  async verifyOtp(@Body() payload: { email: string, otp: number }) {
    return this.authService.verifyResetPasswordOTP(payload.email, payload.otp);
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Reset user password' })
  @ApiBody({ schema: { type: 'object', properties: { userId: { type: 'string' }, newPassword: { type: 'string' }, confirmPassword: { type: 'string' } } } })
  @ApiResponse({ status: 200, description: 'Password reset successfully.' })
  @ApiResponse({ status: 400, description: 'Passwords do not match.' })
  async resetPassword(@Body() payload: { userId: string, newPassword: string, confirmPassword: string }) {
    return this.authService.resetPassword(payload.userId, payload.newPassword, payload.confirmPassword);
  }
}
