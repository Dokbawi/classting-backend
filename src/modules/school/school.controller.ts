import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { SchoolService } from './School.service';
import {
  SchoolCreateDto,
  SchoolNewsCreateDto,
  SchoolNewsDeleteDto,
  SchoolNewsUpdateDto,
  SchoolSubscribeCreateDto,
  SchoolSubscribeDeleteDto,
} from '@dto/school.dto';
import { Permissions, ReqUser } from '@src/decorator/auth.decorator';
import { UserDocument } from '@schema/user.schema';
import { Permission } from '@interface/enum';
import { SchoolDocument } from '@schema/school.schema';

@Controller('school')
export class SchoolController {
  constructor(private readonly SchoolService: SchoolService) {}

  @Post()
  @Permissions(Permission.Admin)
  public async create(@Body() body: SchoolCreateDto) {
    return this.SchoolService.createSchool(body);
  }

  @Post('news')
  @Permissions(Permission.Admin)
  public async createNews(
    @ReqUser() user: UserDocument,
    @Body() body: SchoolNewsCreateDto,
  ) {
    return this.SchoolService.createSchoolNews(user, body);
  }

  @Delete('news')
  @Permissions(Permission.Admin)
  public async deleteNews(@Body() body: SchoolNewsDeleteDto) {
    return this.SchoolService.deleteSchoolNews(body);
  }

  @Patch('news')
  @Permissions(Permission.Admin)
  public async updateNews(@Body() body: SchoolNewsUpdateDto) {
    return this.SchoolService.updateSchoolNews(body);
  }

  @Get('subscribe')
  @Permissions(Permission.Student)
  public async getSchoolSub(
    @ReqUser() user: UserDocument,
  ): Promise<SchoolDocument[]> {
    return this.SchoolService.getSchoolSub(user);
  }

  @Post('subscribe')
  @Permissions(Permission.Student)
  public async createSchoolSub(
    @ReqUser() user: UserDocument,
    @Body() body: SchoolSubscribeCreateDto,
  ) {
    return this.SchoolService.createSchoolSub(user, body);
  }

  @Delete('subscribe')
  @Permissions(Permission.Student)
  public async deleteSchoolSub(
    @ReqUser() user: UserDocument,
    @Body() body: SchoolSubscribeDeleteDto,
  ) {
    return this.SchoolService.deleteSchoolSub(user, body);
  }

  @Get('subscribe/news')
  @Permissions(Permission.Student)
  public async getSubscribeSchoolNewsSub(@ReqUser() user: UserDocument) {
    return this.SchoolService.getSubscribeSchoolNewsSub(user);
  }
}
