import { IsNumber, IsString } from 'class-validator';

export class PaginateDto {
  @IsString()
  cursor?: string;

  @IsNumber()
  size: number;
}
