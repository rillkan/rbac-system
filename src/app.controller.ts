import { Controller, Get, Req } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('health')
  getHealth() {
    return { ok: true };
  }

  @Get('me')
  getMe(@Req() req: any) {
    return req.user;
  }
}
