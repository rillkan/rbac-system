import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly usersService: UsersService) {}

  use(req: any, res: any, next: () => void) {
    const header = req.headers['authorization'];
    if (!header) throw new UnauthorizedException('Missing Authorization header');

    const match = header.match(/^User (.+)$/);
    if (!match) throw new UnauthorizedException('Invalid header format');

    const username = match[1];
    const user = this.usersService.findByUsername(username);

    if (!user) throw new UnauthorizedException('User not found');

    req.user = user;
    next();
  }
}
