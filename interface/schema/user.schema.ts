import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { News } from './school.schema';
import { Types } from 'mongoose';
import { Permission } from '@interface/enum';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  permission: Permission;

  @Prop({
    type: [{ type: Types.ObjectId }],
    ref: 'School',
    validate: {
      validator: async function (value: Types.ObjectId[]) {
        return value.length === new Set(value.map(String)).size;
      },
      message: (props) => `Duplicate IDs are not allowed for ${props.path}`,
    },
  })
  subscribeSchoolIds: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId }], ref: 'News' })
  newsFeed: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
