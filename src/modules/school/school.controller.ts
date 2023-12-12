import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { SchoolService } from './School.service';
import { SchoolCreateDto, SchoolNewsCreateDto } from '@dto/school.dto';
import { Permissions, ReqUser } from '@src/decorator/auth.decorator';
import { User } from '@schema/user.schema';
import { AuthGuard } from '@src/guard/auth.guard';
import { Permission } from 'interface/enum';

@Controller('school')
export class SchoolController {
  constructor(private readonly SchoolService: SchoolService) {}

  @Post()
  @Permissions(Permission.Admin)
  public async create(@Body() body: SchoolCreateDto) {
    return this.SchoolService.createSchool(body);
  }

  @Post()
  @Permissions(Permission.Admin)
  public async createNews(@Body() body: SchoolNewsCreateDto) {
    return this.SchoolService.createSchoolNews(body);
  }
}
