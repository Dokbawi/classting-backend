import {
  SchoolCreateDto,
  SchoolNewsCreateDto,
  SchoolNewsDeleteDto,
  SchoolNewsUpdateDto,
  SchoolSubscribeCreateDto,
  SchoolSubscribeDeleteDto,
} from '@dto/school.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel, Schema } from '@nestjs/mongoose';
import {
  News,
  NewsDocument,
  School,
  SchoolDocument,
} from '@schema/school.schema';
import { User, UserDocument } from '@schema/user.schema';
import { FilterQuery, Model, Types } from 'mongoose';

@Injectable()
export class SchoolService {
  constructor(
    @InjectModel(School.name) private schoolModel: Model<School>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(News.name) private newsModel: Model<News>,
  ) {}

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

  public async createSchoolNews(user: UserDocument, data: SchoolNewsCreateDto) {
    const { context, schoolId, schoolName } = data;

    const option = {} as FilterQuery<School>;

    if (schoolId) {
      option._id = schoolId;
    } else if (schoolName) {
      option.name = schoolName;
    }

    const school = await this.schoolModel.findOne(option);

    if (!school) {
      throw new BadRequestException('School not found.');
    }
    const createNews = new this.newsModel({ context });

    school.news.push(createNews._id);
    school.save();

    const userInfo = await this.userModel.findById(user._id);

    userInfo.newsFeed.push(createNews._id);
    userInfo.save();
    return createNews.save();
  }

  public async updateSchoolNews(data: SchoolNewsUpdateDto) {
    const { context, id } = data;

    // const school = await this.schoolModel.findOne({ 'news._id': id });
    // const foundNews = school.news.find((news: NewsDocument) => news._id === id);

    // if (!foundNews) {
    //   throw new BadRequestException('News not found.');
    // }

    // foundNews.context = context;

    const news = await this.newsModel.findById(id);
    news.context = context;

    return news.save();
  }

  public async deleteSchoolNews(data: SchoolNewsDeleteDto) {
    const { id } = data;

    await this.userModel.updateMany({
      $pullAll: { newsFeed: [new Types.ObjectId(id)] },
    });
    await this.schoolModel.updateMany({
      $pullAll: { news: [new Types.ObjectId(id)] },
    });

    return await this.newsModel.findByIdAndDelete(id);
  }

  public async getSchoolSub(user: UserDocument): Promise<SchoolDocument[]> {
    const school = await this.schoolModel.find({
      _id: { $in: user.subscribeSchoolIds },
    });

    return school;
  }

  public async createSchoolSub(
    user: UserDocument,
    data: SchoolSubscribeCreateDto,
  ) {
    const { schoolId, schoolName } = data;

    const option = {} as FilterQuery<School>;

    if (schoolId) {
      option._id = schoolId;
    } else if (schoolName) {
      option.name = schoolName;
    }

    const school = await this.schoolModel.findOne(option);

    if (!school) {
      throw new BadRequestException('School not found.');
    }

    user.subscribeSchoolIds.push(school._id);
    user.newsFeed = [...user.newsFeed, ...school.news];

    return user.save();
  }

  public async deleteSchoolSub(
    user: UserDocument,
    data: SchoolSubscribeDeleteDto,
  ) {
    const { id } = data;

    const schoolIndex = user.subscribeSchoolIds.findIndex(
      (schoolId) => schoolId === id,
    );

    if (schoolIndex === -1) {
      throw new BadRequestException(`Failed to cancel subscribe ${id}`);
    }

    user.subscribeSchoolIds.splice(schoolIndex, 1);

    return user.save();
  }
}
