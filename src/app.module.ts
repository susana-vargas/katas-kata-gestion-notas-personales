import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';

import { NoteModule } from './gestion-notes/note.module';
import { DatabaseModule } from './database/database.module';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { UserController } from './gestion-notes/user.controller';
// import { UserService } from './gestion-notes/services/user.service';

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
  ],
  // controllers: [AppController, UserController],
  // providers: [AppService, UserService],
})
export class AppModule {}
