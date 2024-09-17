import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseModule } from 'src/database/database.module';
import { NoteConroller } from './note.controller';
import { NoteDAO } from './daos/note.dao';
import { NoteEntity } from './entities/note.entity';
import { NoteService } from './services/note.service';
import { NoteStrategy } from './strategys/note.strategy';
import { NOTIFICATION_RECORDATORY } from 'src/constants';
import { NotificationService } from './services/notification-service';
import { QueueProcessor } from './queue.processor';
// import { NotifyController } from './notify.controller';

@Module({
  imports: [
    BullModule.registerQueue({
      name: NOTIFICATION_RECORDATORY,
    }),
    DatabaseModule,
    NoteDAO,
    TypeOrmModule.forFeature([NoteEntity]),
  ],
  controllers: [NoteConroller],
  providers: [
    NoteStrategy,
    NoteService,
    NotificationService,
    QueueProcessor,
    NoteDAO,
  ],
})
export class NoteModule {}
