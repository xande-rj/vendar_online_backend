import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { authorizationToLoginPaylod } from '../util/base64-to-string';

export const UserId = createParamDecorator((_, ctx: ExecutionContext) => {
  const { authorization } = ctx.switchToHttp().getRequest().headers;

  const loginPayload = authorizationToLoginPaylod(authorization);

  return loginPayload?.id;
});
