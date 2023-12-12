import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';
import { News } from './school.schema';
import { Permission } from 'interface/enum';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  permission: Permission;

  @Prop()
  subscribeSchoolIds: ObjectId[];

  @Prop()
  newsFeed: News[];
}

export const UserSchema = SchemaFactory.createForClass(User);
