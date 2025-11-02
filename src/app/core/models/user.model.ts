export interface User {
  id?: number;
  username: string;
  email: string;
  role?: string; // sau RoleService enum, dacă există
}
