import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '@schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  public async getUserNewsFeed(user: UserDocument) {
    const userNewsFeed = await this.userModel
      .findById(user._id)
      .select('newsFeed')
      .populate({
        path: 'newsFeed',
        options: {
          sort: { createdAt: -1 },
        },
      });

    return userNewsFeed.newsFeed;
  }
}
