import { Module } from '@nestjs/common';
import { SchoolService } from './School.service';
import { SchoolController } from './School.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { School, SchoolSchema } from '@schema/school.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: School.name,
        schema: SchoolSchema,
      },
    ]),
  ],
  controllers: [SchoolController],
  providers: [SchoolService],
})
export class SchoolModule {}
