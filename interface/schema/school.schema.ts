import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SchoolDocument = HydratedDocument<School>;
export type NewsDocument = HydratedDocument<News>;

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
}

@Schema()
export class News {
  @Prop()
  context: String;
}

export const SchoolSchema = SchemaFactory.createForClass(School);
