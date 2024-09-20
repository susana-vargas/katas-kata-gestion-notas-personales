import { Module } from '@nestjs/common';
import { config } from 'dotenv';

import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategys/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/users/user.module';

config();

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      // Clave secreta para firmar el token
      secret: process.env.JWT_SECRET_KEY,
      // Tiempo de expiración del token (1 hora)
      signOptions: { expiresIn: '1h' },
    }),
    UserModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
