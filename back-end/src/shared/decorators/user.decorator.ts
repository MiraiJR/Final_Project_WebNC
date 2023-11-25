import { ExecutionContext, createParamDecorator } from '@nestjs/common';

const UserDecorator = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  },
);

export default UserDecorator;
