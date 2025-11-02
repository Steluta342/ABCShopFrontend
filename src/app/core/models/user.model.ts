export interface User {
  id?: number;
  username: string;
  email: string;
  role?: string; // sau Role enum, dacă există
}
