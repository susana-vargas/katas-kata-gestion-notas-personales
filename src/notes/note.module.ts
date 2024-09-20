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
import { UserEntity } from 'src/users/typeorm/entity/user.entity';
import { UserModule } from 'src/users/user.module';

@Module({
  imports: [
    BullModule.registerQueue({
      name: NOTIFICATION_RECORDATORY,
    }),
    DatabaseModule,
    UserModule,
    TypeOrmModule.forFeature([NoteEntity, UserEntity]),
  ],
  controllers: [NoteConroller],
  providers: [
    NoteDAO,
    NoteService,
    NoteStrategy,
    NotificationService,
    QueueProcessor,
  ],
  exports: [NoteDAO],
})
export class NoteModule {}
