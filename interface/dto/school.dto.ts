import { IsString, isString } from 'class-validator';

export class SchoolCreateDto {
  @IsString()
  region: string;

  @IsString()
  name: string;
}
