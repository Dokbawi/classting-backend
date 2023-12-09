import { Body, Controller, Post } from '@nestjs/common';
import { SchoolService } from './School.service';
import { SchoolCreateDto } from '@dto/school.dto';

@Controller('school')
export class SchoolController {
  constructor(private readonly SchoolService: SchoolService) {}

  @Post()
  public async create(@Body() body: SchoolCreateDto) {
    return this.SchoolService.createSchool(body);
  }
}
