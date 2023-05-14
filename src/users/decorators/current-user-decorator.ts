// import { createParamDecorator, ExecutionContext } from '@nestjs/common';


// export const CurrentUser = createParamDecorator(
//   (data: never, context: ExecutionContext) => {
//     const request = context.switchToHttp().getRequest();
//     return request.session.userId;
//   },
// );


// current-user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';


export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user; // Assuming the user object is attached to the request object during authentication
  },
);
