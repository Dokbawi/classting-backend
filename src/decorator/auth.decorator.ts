import { Permission } from '@interface/enum';
import {
  ExecutionContext,
  SetMetadata,
  createParamDecorator,
} from '@nestjs/common';

export const ReqUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

export const Permissions = (...permissions: Permission[]) =>
  SetMetadata('roles', permissions);
