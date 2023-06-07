import {
  Injectable,
  UnauthorizedException,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { verify, JwtPayload } from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Unauthorized');
    }

    try {
      // Verify and decode the token
      const decodedToken = verify(token, process.env.JWT) as JwtPayload;

      // Attach the decoded token to the request object for later use
      request.user = decodedToken;

      return true;
    } catch (error) {
      throw new UnauthorizedException('Unauthorized');
    }
  }
}
