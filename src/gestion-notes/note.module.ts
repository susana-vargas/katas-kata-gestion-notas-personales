import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseModule } from 'src/database/database.module';
import { NoteConroller } from './note.controller';
import { NoteDAO } from './daos/note.dao';
import { NoteEntity } from './typeorm/entities/note.entity';
import { NoteService } from './services/note.service';
import { NoteStrategy } from './strategys/note.strategy';
import { NOTIFICATION_RECORDATORY } from 'src/constants';
import { NotificationService } from './notify/services/notification-service';
import { QueueProcessor } from './processors/queue.processor';
import { UserController } from './user.controller';
import { UserDAO } from './daos/user.dao';
import { UserService } from './services/user.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: NOTIFICATION_RECORDATORY,
    }),
    DatabaseModule,
    TypeOrmModule.forFeature([NoteEntity]),
  ],
  controllers: [NoteConroller, UserController],
  providers: [
    QueueProcessor,
    NoteStrategy,
    NoteService,
    UserService,
    NotificationService,
    NoteDAO,
    UserDAO,
  ],
  exports: [NoteDAO, UserDAO],
})
export class NoteModule {}
