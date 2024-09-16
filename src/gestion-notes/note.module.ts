import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';

import { NoteConroller } from './note.controller';
import { NoteService } from './note.service';
import { NoteStrategy } from './note.strategy';
import { NOTIFICATION_RECORDATORY } from 'src/constants';
import { NotificationService } from './notification-service';
import { QueueProcessor } from './queue.processor';
// import { NotifyController } from './notify.controller';

@Module({
  imports: [
    BullModule.registerQueue({
      name: NOTIFICATION_RECORDATORY,
    }),
  ],
  controllers: [NoteConroller],
  providers: [NoteStrategy, NoteService, NotificationService, QueueProcessor],
})
export class NoteModule {}
