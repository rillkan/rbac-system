import { Injectable } from '@nestjs/common';

export type Role = 'ADMIN' | 'EDITOR' | 'VIEWER';

export interface User {
  username: string;
  role: Role;
}

@Injectable()
export class UsersService {
  private users: User[] = [
    { username: 'admin', role: 'ADMIN' },
    { username: 'editor', role: 'EDITOR' },
    { username: 'viewer', role: 'VIEWER' },
  ];

  findByUsername(username: string): User | undefined {
    return this.users.find((u) => u.username === username);
  }
}
