import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private tokenKey = 'auth_token';
  private userIdKey = 'user_id';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post('/api/auth/login', { username, password }).pipe(
      tap((resp: any) => {
        localStorage.setItem(this.tokenKey, resp.token);
        localStorage.setItem(this.userIdKey, resp.userId.toString());
      })
    );
    //return this.http.post<any>('/api/auth/login', { username, password });
  }
  // salvează token + userId
  saveSession(token: string, userId: number) {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.userIdKey, userId.toString());
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUserId(): number | null {
    const v = localStorage.getItem(this.userIdKey);
    return v ? Number(v) : null;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userIdKey);
  }
}
