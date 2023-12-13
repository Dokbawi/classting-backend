import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { UserService } from './User.service';
import { Permissions, ReqUser } from '@src/decorator/auth.decorator';
import { Permission } from '@interface/enum';
import { UserDocument } from '@schema/User.schema';
import { PaginateDto } from '@dto/common.dto';

@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Get('news-feed')
  @Permissions(Permission.Student)
  public async getUserNewsFeed(
    @ReqUser() user: UserDocument,
    @Body() body: PaginateDto,
  ) {
    return this.UserService.getUserNewsFeed(user, body);
  }
}
