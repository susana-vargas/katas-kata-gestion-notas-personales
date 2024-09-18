import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserDAO } from 'src/gestion-notes/daos/user.dao';

@Injectable()
export class AuthService {
  constructor(
    private readonly userDAO: UserDAO,
    private readonly jwtService: JwtService,
  ) {}

  // TODO: seguir revisando porqu eel user me devuelbe undefined
  async validateUser(name: string, password: string): Promise<any> {
    const user = await this.userDAO.findOneByName(name);
    if (!user) {
      return null;
    }
    const isPasswordMatching = await bcrypt.compare(password, user.password);
    if (!isPasswordMatching) {
      return null;
    }
    // Si las credenciales coinciden, eliminamos la contraseña antes de devolver el usuario
    const { password: _password, ...result } = user;
    console.log(password, 'la contraseña que no se usaba ahora se usa');
    return result;
  }

  async login(user: any) {
    // Creamos el payload con nombre e ID del usuario
    const payload = { name: user.name, sub: user.id };
    return {
      // Generamos el token JWT
      access_token: this.jwtService.sign(payload),
    };
  }
}
