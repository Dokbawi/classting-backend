import { SchoolCreateDto } from '@dto/school.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel, Schema } from '@nestjs/mongoose';
import { School } from '@schema/school.schema';
import { Model } from 'mongoose';

@Injectable()
export class SchoolService {
  constructor(@InjectModel(School.name) private schoolModel: Model<School>) {}

  public async createSchool(data: SchoolCreateDto) {
    const { region, name } = data;

    const school = await this.schoolModel.findOne({
      name,
    });

    if (school) {
      throw new BadRequestException('Alreay exist School.');
    }

    const createSchool = new this.schoolModel({ name, region });

    return createSchool.save();
  }
}
