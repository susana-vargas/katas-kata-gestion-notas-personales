import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

import { MESSAGE_ACTION, NOTIFICATION_RECORDATORY } from 'src/constants';

type Value = {
  foo: string;
};

@Processor(NOTIFICATION_RECORDATORY)
export class QueueProcessor {
  @Process(MESSAGE_ACTION)
  async message({ data: { foo } }: Job<Value>): Promise<any> {
    console.log('se cacha la cola 🏁', foo);
  }
}
