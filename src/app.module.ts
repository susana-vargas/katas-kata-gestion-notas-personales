import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NoteModule } from './gestion-notes/note.module';
import { DatabaseModule } from './database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteEntity } from './gestion-notes/entities/note.entity';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'redis',
        port: 6379,
      },
    }),
    NoteModule,
    DatabaseModule,
    TypeOrmModule.forFeature([NoteEntity]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
