import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Role } from '../models/role.model';
import { RoleRequestPayload } from '../models/role-request.model';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  // corespunde @RequestMapping("api/roles")
  private readonly baseUrl = '/api/roles';

  constructor(private http: HttpClient) {}

  /** GET /api/roles */
  getAll(): Observable<Role[]> {
    return this.http.get<Role[]>(this.baseUrl);
  }

  /** GET /api/roles/getbyid/{id} */
  getById(id: number): Observable<Role> {
    return this.http.get<Role>(`${this.baseUrl}/getbyid/${id}`);
  }

  /** GET /api/roles/getbyname/{roleName} */
  getByName(roleName: string): Observable<Role> {
    return this.http.get<Role>(`${this.baseUrl}/getbyname/${encodeURIComponent(roleName)}`);
  }

  /** POST /api/roles */
  create(body: RoleRequestPayload): Observable<Role> {
    // poți apela cu: this.roleService.create({ roleName: 'ADMIN', users: [] })
    return this.http.post<Role>(this.baseUrl, body);
  }

  /** PUT /api/roles/{id} */
  update(id: number, body: RoleRequestPayload): Observable<Role> {
    return this.http.put<Role>(`${this.baseUrl}/${id}`, body);
  }

  /** DELETE /api/roles/{id} */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
