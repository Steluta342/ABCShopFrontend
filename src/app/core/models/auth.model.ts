export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  role: string;
}
