import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '@schema/user.schema';
import { Request } from 'express';
import { Model } from 'mongoose';

@Injectable()
export class AuthGuard implements CanActivate {
  reflector: Reflector;
  constructor(@InjectModel(User.name) private userModel: Model<User>) {
    this.reflector = new Reflector();
  }

  public async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const { authorization } = request.headers;
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!authorization) {
      return false;
    }

    console.log(`roles : ${roles}`);
    const uid = await this.validateUser(request);
    console.log(`uid : ${uid}`);
    if (uid === undefined) {
      return false;
    }

    const user = await this.userModel.findById(uid);

    console.log(`user : ${user}`);

    if (!user) {
      return false;
    }
    request['user'] = user;

    console.log(`Request from ${user.name}`);
    return roles.includes(user.permission);
  }

  private async validateUser(request: Request) {
    try {
      const { authorization } = request.headers;
      const bearerToken = authorization.slice(7);

      return bearerToken;
    } catch (error) {
      throw new UnauthorizedException(error.code);
    }
  }
}
