// src/auth/check-permission.ts
import { RolePermissions } from './permissions';

export function can(role: string, action: string): boolean {
  const permissions = RolePermissions[role];
  if (!permissions) return false; // role not found
  return permissions.includes(action);
}
