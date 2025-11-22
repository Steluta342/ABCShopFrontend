import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../models/user.model';
import {
  RegisterRequestPayload,
  UserRequestPayload
} from '../models/user-payload.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // corespunde @RequestMapping("/api/users")
  private readonly baseUrl = '/api/users';

  constructor(private http: HttpClient) {}

  /** GET /api/users */
  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  /** GET /api/users/getbyid/{id} */
  getById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/getbyid/${id}`);
  }

  /** GET /api/users/getbyusername/{username} */
  getByUsername(username: string): Observable<User> {
    return this.http.get<User>(
      `${this.baseUrl}/getbyusername/${encodeURIComponent(username)}`
    );
  }

  /** GET /api/users/getbyemail/{email} */
  getByEmail(email: string): Observable<User> {
    return this.http.get<User>(
      `${this.baseUrl}/getbyemail/${encodeURIComponent(email)}`
    );
  }

  /**
   * POST /api/users
   * Body: RegisterRequest
   * folosit pentru înregistrarea unui nou user
   */
  register(body: RegisterRequestPayload): Observable<User> {
    return this.http.post<User>(this.baseUrl, body);
  }

  /**
   * PUT /api/users/{id}
   * Body: UserRequest
   * folosit pentru editarea unui user existent
   */
  update(id: number, body: UserRequestPayload): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/${id}`, body);
  }

  /** DELETE /api/users/{id} */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
