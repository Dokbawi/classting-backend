import { PaginateDto } from '@dto/common.dto';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '@schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  public async getUserNewsFeed(user: UserDocument, data: PaginateDto) {
    const { cursor, size } = data;
    let query = {};

    if (cursor) {
      query = { 'newsFeed.createdAt': { $lt: new Date(cursor) } };
    }

    const userNewsFeed = await this.userModel
      .findById(user._id)
      .select('newsFeed')
      .elemMatch('newsFeed', query)
      .sort({ 'newsFeed.createdAt': -1 })
      .limit(size);

    const nextCursor =
      userNewsFeed.newsFeed.length > 0
        ? userNewsFeed.newsFeed[
            userNewsFeed.newsFeed.length - 1
          ].createdAt.toISOString()
        : null;

    return {
      nextCursor,
      newsFeed: userNewsFeed.newsFeed,
    };
  }
}
