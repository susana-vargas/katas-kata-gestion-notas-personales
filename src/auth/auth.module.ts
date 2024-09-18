import { Module } from '@nestjs/common';
import { config } from 'dotenv';

import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategys/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { NoteModule } from 'src/gestion-notes/note.module';

config();

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY, // Clave secreta para firmar el token
      signOptions: { expiresIn: '1h' }, // Tiempo de expiración del token (1 hora en este caso)
    }),
    NoteModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
