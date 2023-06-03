import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';




 @Injectable()
export class AuthGuard implements CanActivate {
  //constructor(private readonly auth: AuthService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Unauthorized');
    }

    //authentication logic here
    // const isValidToken = this.auth.validateToken(token);

    // if (!isValidToken) {
    //   throw new UnauthorizedException('Invalid token');
    // }

    return false;
  }
}
