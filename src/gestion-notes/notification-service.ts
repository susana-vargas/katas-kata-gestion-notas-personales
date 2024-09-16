import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

import { MESSAGE_ACTION, NOTIFICATION_RECORDATORY } from 'src/constants';

const EXECUTION_TIME = '*/2 * * * *';

@Injectable()
export class NotificationService {
  constructor(@InjectQueue(NOTIFICATION_RECORDATORY) private myQueue: Queue) {}
  async execute() {
    console.log('llega al execute del servicio');
    await this.myQueue.add(
      MESSAGE_ACTION,
      {
        foo: 'bar',
      },
      {
        attempts: 3, // cantidad de intentos
        repeat: {
          cron: EXECUTION_TIME, // se repite cada 2 min
        },
        timeout: 15000, // tiempo en el que se completa
      },
    );
    console.log('se dejo el mensaje de la cola 💬');
  }
}
