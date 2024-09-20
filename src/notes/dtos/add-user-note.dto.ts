import { IsNotEmpty, IsUUID } from 'class-validator';

export class AddUserNoteDTO {
  @IsUUID()
  @IsNotEmpty()
  readonly userId: string;
}
