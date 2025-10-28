import { Injectable } from '@nestjs/common';
import { Article } from './article.entity';

@Injectable()
export class ArticlesService {
  private articles: Article[] = [];

  findAll() {
    return this.articles.sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );
  }

  create(title: string, body: string, author_username: string) {
    const article = {
      id: 'a_' + Date.now(),
      title,
      body,
      author_username,
      created_at: new Date().toISOString(),
    };
    this.articles.push(article);
    return article;
  }

  delete(id: string) {
    const index = this.articles.findIndex(a => a.id === id);
    if (index === -1) return null;
    this.articles.splice(index, 1);
    return true;
  }
}
