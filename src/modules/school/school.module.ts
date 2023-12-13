import { Module } from '@nestjs/common';
import { SchoolService } from './School.service';
import { SchoolController } from './School.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { News, NewsSchema, School, SchoolSchema } from '@schema/school.schema';
import { User, UserSchema } from '@schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: School.name,
        schema: SchoolSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: News.name,
        schema: NewsSchema,
      },
    ]),
  ],
  controllers: [SchoolController],
  providers: [SchoolService],
})
export class SchoolModule {}
