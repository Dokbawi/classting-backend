import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Types } from 'mongoose';

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
  region: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'News' }] })
  news: Types.ObjectId[];
}

@Schema()
export class News {
  @Prop()
  context: String;

  @Prop({ default: () => new Date() })
  createdAt?: Date;
}

export const SchoolSchema = SchemaFactory.createForClass(School);
export const NewsSchema = SchemaFactory.createForClass(News);
