import { IsString } from 'class-validator';

export class SchoolCreateDto {
  @IsString()
  region: string;

  @IsString()
  name: string;
}
