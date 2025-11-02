// core/services/order.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderRequestPayload } from '../models/order-payload.model';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private baseUrl = '/api/orders';

  constructor(private http: HttpClient) {}

  create(body: OrderRequestPayload): Observable<any> {
    return this.http.post<any>(this.baseUrl, body);
  }

  // (opționale)
  getAll()           { return this.http.get<any[]>(this.baseUrl); }
  getById(id: number){ return this.http.get<any>(`${this.baseUrl}/getbyid/${id}`); }
  getByUser(id: number){ return this.http.get<any[]>(`${this.baseUrl}/getbyuserid/${id}`); }
  delete(id: number) { return this.http.delete(`${this.baseUrl}/${id}`); }
}
