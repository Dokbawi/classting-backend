import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';

export type SchoolDocument = HydratedDocument<School>;

@Schema()
export class School {
  @Prop({
    required: true,
    unique: true,
  })
  name: string;

  @Prop()
  region: number;

  @Prop()
  news: News[];

  @Prop()
  adminsIds: ObjectId[];
}

@Schema()
export class News {
  @Prop()
  context: String;
}

export const SchoolSchema = SchemaFactory.createForClass(School);
