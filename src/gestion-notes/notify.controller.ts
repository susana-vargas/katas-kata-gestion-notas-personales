import { Controller, Get } from '@nestjs/common';
import { NotificationService } from './notification-service';

@Controller('notify')
export class NotifyController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  sendNotification() {
    return this.notificationService.execute();
  }
}
