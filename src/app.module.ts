import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ArticlesModule } from './articles/articles.module';
import { AuthMiddleware } from './auth/auth.middleware';
import { UsersService } from './users/users.service';

@Module({
  imports: [UsersModule, ArticlesModule],
  controllers: [AppController],
  providers: [AppService, UsersService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: 'health', method: RequestMethod.GET }) // 👈 exclude health route
      .forRoutes('*');
  }
}
