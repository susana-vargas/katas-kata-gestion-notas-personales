import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './user.controller';
import { UserDAO } from './daos/user.dao';
import { UserEntity } from './typeorm/entity/user.entity';
import { UserService } from './services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, UserDAO],
  exports: [UserDAO],
})
export class UserModule {}
