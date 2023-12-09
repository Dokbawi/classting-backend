import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { News } from './school.schema';
import { Permission } from 'interface/enum';
import { Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  permission: Permission;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'School' }] })
  subscribeSchoolIds: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'News' }] })
  newsFeed: News[];
}

export const UserSchema = SchemaFactory.createForClass(User);
