// current-user.decorator
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

export async function  getUserFromToken(token: string): Promise<any> {
  try {
    const decodedToken = await jwt.verify(token, 'jwtsecret');
    return decodedToken;
  } catch (error) {
    // Token verification failed or expired
    return null;
  }
}

export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const token = request.rawHeaders[1].toString().split(' ')[1];
    const user = getUserFromToken(token);
    request.user = user;

    return request.user;
  },
);
