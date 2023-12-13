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

  @Prop()
  subscribeSchoolIds: Types.ObjectId[];

  @Prop()
  newsFeed: News[];
}

export const UserSchema = SchemaFactory.createForClass(User);
