import { IsNumber, IsOptional, IsString } from 'class-validator';

export class PaginateDto {
  @IsString()
  @IsOptional()
  cursor?: string;

  @IsNumber()
  size: number;
}
