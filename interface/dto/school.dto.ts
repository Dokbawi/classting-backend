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
  @IsMongoId()
  @IsOptional()
  @ValidateIf((object, val) => object.schoolId === undefined)
  schoolName?: Types.ObjectId;

  @IsMongoId()
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
  @IsMongoId()
  @Transform(({ value }: TransformFnParams) => new Types.ObjectId(value), {
    toClassOnly: true,
  })
  id: Types.ObjectId;

  @IsString()
  context: string;
}

export class SchoolNewsDeleteDto {
  @IsMongoId()
  @Transform(({ value }: TransformFnParams) => new Types.ObjectId(value), {
    toClassOnly: true,
  })
  id: Types.ObjectId;
}

export class SchoolSubscribeCreateDto {
  @IsMongoId()
  @IsOptional()
  @ValidateIf((object, val) => object.schoolId === undefined)
  schoolName?: Types.ObjectId;

  @IsMongoId()
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
