import { News } from '@schema/school.schema';
import { Type } from 'class-transformer';
import { IsArray, IsString, ValidateNested } from 'class-validator';

export class UserNewsFeedResponseDto {
  @IsString()
  nextCursor: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => News)
  news: News[];
}
