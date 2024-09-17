import { IsNumber, IsString } from 'class-validator';

export class NoteDTO {
  @IsString()
  content: string;

  @IsString()
  createdAt: string;

  @IsNumber()
  importance: number;
}
