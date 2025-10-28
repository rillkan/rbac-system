// src/articles/articles.controller.ts
import { Controller, Get, Post, Delete, Body, Param, Headers, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { can } from '../auth/check-permission';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  findAll(@Headers('authorization') auth: string) {
    const username = this.extractUser(auth);
    const userRole = this.getUserRole(username);

    if (!can(userRole, 'read')) {
      throw new UnauthorizedException('You do not have permission to read articles');
    }

    return this.articlesService.findAll();
  }

  @Post()
  create(@Headers('authorization') auth: string, @Body() body: any) {
    const username = this.extractUser(auth);
    const userRole = this.getUserRole(username);

    if (!can(userRole, 'create')) {
      throw new UnauthorizedException('You do not have permission to create articles');
    }

    return this.articlesService.create(body.title, body.body, username);
  }

  @Delete(':id')
  delete(@Headers('authorization') auth: string, @Param('id') id: string) {
    const username = this.extractUser(auth);
    const userRole = this.getUserRole(username);

    if (!can(userRole, 'delete')) {
      throw new UnauthorizedException('You do not have permission to delete articles');
    }

    const deleted = this.articlesService.delete(id);
    if (!deleted) throw new NotFoundException('Article not found');
    return { message: 'deleted' };
  }

  private extractUser(auth: string): string {
    if (!auth) throw new UnauthorizedException('Missing Authorization header');
    const parts = auth.split(' ');
    return parts.length === 2 ? parts[1] : '';
  }

  private getUserRole(username: string): string {
    const users = {
      editor: 'editor',
      viewer: 'viewer',
      admin: 'admin',
    };
    return users[username] || 'viewer';
  }
}
