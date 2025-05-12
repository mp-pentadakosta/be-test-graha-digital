import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    // ✅ Jika token valid, pakai user dari JWT
    if (user) {
      return user;
    }

    // ✅ Jika tidak ada token atau token invalid → fallback ke guest
    request.user = { role: 'GUEST' }; // Role harus sesuai enum dari Prisma
    return request.user;
  }
}
