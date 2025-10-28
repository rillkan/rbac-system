// src/auth/permissions.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolePermissions } from './permissions'; // ✅ correct import

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions =
      this.reflector.get<string[]>('permissions', context.getHandler()) || [];

    const request = context.switchToHttp().getRequest();
    const user = request.user; // make sure you set user earlier in an auth middleware

    if (!user || !user.role) return false;

    const userPerms = RolePermissions[user.role] || []; // ✅ use RolePermissions here
    return requiredPermissions.every(p => userPerms.includes(p));
  }
}
