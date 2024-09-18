import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() user: { name: string; password: string }) {
    const validatedUser = await this.authService.validateUser(
      user.name,
      user.password,
    );
    if (!validatedUser) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    return this.authService.login(validatedUser);
  }
}
