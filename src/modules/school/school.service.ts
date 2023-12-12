import {
  SchoolCreateDto,
  SchoolNewsCreateDto,
  SchoolNewsDeleteDto,
  SchoolNewsUpdateDto,
} from '@dto/school.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel, Schema } from '@nestjs/mongoose';
import { NewsDocument, School } from '@schema/school.schema';
import { FilterQuery, Model } from 'mongoose';

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

  public async createSchoolNews(data: SchoolNewsCreateDto) {
    const { context, schoolId, schoolName } = data;

    const option = {} as FilterQuery<School>;

    if (schoolId) {
      option.user = schoolId;
    } else if (schoolName) {
      option.name = schoolName;
    }

    const school = await this.schoolModel.findOne(option);

    if (!school) {
      throw new BadRequestException('School not found.');
    }

    school.news.push({ context });
    return school.save();
  }

  public async updateSchoolNews(data: SchoolNewsUpdateDto) {
    const { context, id } = data;

    const school = await this.schoolModel.findOne({ 'news._id': id });
    const foundNews = school.news.find((news: NewsDocument) => news._id === id);

    if (!foundNews) {
      throw new BadRequestException('News not found.');
    }

    foundNews.context = context;

    return school.save();
  }

  public async deleteSchoolNews(data: SchoolNewsDeleteDto) {
    const { id } = data;

    const school = await this.schoolModel.findOne({ 'news._id': id });
    const foundNewsIndex = school.news.findIndex(
      (news: NewsDocument) => news._id === id,
    );

    if (foundNewsIndex === -1) {
      throw new BadRequestException('News not found.');
    }

    school.news.splice(foundNewsIndex, 1);

    return school.save();
  }
}
