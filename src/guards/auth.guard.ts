import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

// export class AuthGuard implements CanActivate {
//   constructor(private readonly jwtService: JwtService) {}
//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     const request = context.switchToHttp().getRequest();

//     const token = request.headers.authorization?.split(' ')[1];
//     if (token) {
//       try {
//         const decodedToken = this.jwtService.verify(token);
//         console.log(decodedToken)
//         request.user = decodedToken;
//         return true;
//       } catch (error) {
//         return false;
//       }
//     }

//     return false;
//   }
// }

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return true;
  }
}
