import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { NoteModule } from './notes/note.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    AuthModule,
    DatabaseModule,
    NoteModule,
    UserModule,
  ],
})
export class AppModule {}
