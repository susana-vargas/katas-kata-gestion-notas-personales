import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { NoteModule } from './gestion-notes/note.module';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    NoteModule,
    DatabaseModule,
    AuthModule,
  ],
})
export class AppModule {}
