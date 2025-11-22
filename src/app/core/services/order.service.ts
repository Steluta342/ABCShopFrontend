// core/services/order.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { OrderRequestPayload } from '../models/order-payload.model';
import { Order } from '../models/order.model';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly baseUrl = '/api/orders';

  constructor(private http: HttpClient) {}

  /** CREATE – POST /api/orders */
  create(body: OrderRequestPayload): Observable<Order> {
    return this.http.post<Order>(this.baseUrl, body);
  }

  /** READ ALL – GET /api/orders */
  getAll(): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl);
  }

  /** READ BY ID – GET /api/orders/getbyid/{id} */
  getById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}/getbyid/${id}`);
  }

  /** READ BY USER – GET /api/orders/getbyuserid/{id} */
  getByUser(userId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/getbyuserid/${userId}`);
  }

  /** UPDATE – PUT /api/orders/{id} */
  update(id: number, body: OrderRequestPayload): Observable<Order> {
    return this.http.put<Order>(`${this.baseUrl}/${id}`, body);
  }

  /** DELETE – DELETE /api/orders/{id} */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
