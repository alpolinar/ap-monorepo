import { ExecutionContext, createParamDecorator } from '@nestjs/common';

/**
 * @decorator
 */

export const CurrentUser = createParamDecorator(
  async (_data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  },
);
