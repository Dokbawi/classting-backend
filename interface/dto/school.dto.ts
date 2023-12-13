import { Transform, TransformFnParams } from 'class-transformer';
import { IsMongoId, IsOptional, IsString, ValidateIf } from 'class-validator';
import { Types } from 'mongoose';

export class SchoolCreateDto {
  @IsString()
  region: string;

  @IsString()
  name: string;
}

export class SchoolNewsCreateDto {
  @IsString()
  @IsOptional()
  @ValidateIf((object, val) => object.schoolId === undefined)
  schoolName?: Types.ObjectId;

  @IsOptional()
  @ValidateIf((object, val) => object.schoolName === undefined)
  @Transform(({ value }: TransformFnParams) => new Types.ObjectId(value), {
    toClassOnly: true,
  })
  schoolId?: Types.ObjectId;

  @IsString()
  context: string;
}

export class SchoolNewsUpdateDto {
  @Transform(({ value }: TransformFnParams) => new Types.ObjectId(value), {
    toClassOnly: true,
  })
  id: Types.ObjectId;

  @IsString()
  context: string;
}

export class SchoolNewsDeleteDto {
  @Transform(({ value }: TransformFnParams) => new Types.ObjectId(value), {
    toClassOnly: true,
  })
  id: Types.ObjectId;
}

export class SchoolSubscribeCreateDto {
  @IsString()
  @IsOptional()
  @ValidateIf((object, val) => object.schoolId === undefined)
  schoolName?: Types.ObjectId;

  @IsOptional()
  @ValidateIf((object, val) => object.schoolName === undefined)
  @Transform(({ value }: TransformFnParams) => new Types.ObjectId(value), {
    toClassOnly: true,
  })
  schoolId?: Types.ObjectId;
}

export class SchoolSubscribeDeleteDto {
  @IsMongoId()
  @Transform(({ value }: TransformFnParams) => new Types.ObjectId(value), {
    toClassOnly: true,
  })
  id: Types.ObjectId;
}

export class SchoolNewsResponseDto {}
