import { Expose, Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class SearchDto {
  private _page = 1;

  @IsString()
  @IsOptional()
  readonly where: string = '';

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  readonly limit: number = 10;

  get offset(): number {
    return (this._page - 1) * this.limit;
  }

  get page(): number {
    return this._page;
  }

  @IsNumber()
  @IsOptional()
  @Expose({ name: 'page' })
  @Transform(({ value }) => parseInt(value))
  set page(value: number) {
    if (!(value && value > 0)) {
      return;
    }
    this._page = value;
  }
}
