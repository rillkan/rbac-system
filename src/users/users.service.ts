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
    { username: 'ed', role: 'EDITOR' },
    { username: 'vi', role: 'VIEWER' },
  ];

  findByUsername(username: string): User | undefined {
    return this.users.find((u) => u.username === username);
  }
}
