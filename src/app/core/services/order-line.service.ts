import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { OrderLine } from '../models/order-line.model';
import { OrderLineRequestPayload } from '../models/order-line-request.model';

@Injectable({
  providedIn: 'root',
})
export class OrderLineService {
  private readonly baseUrl = '/api/orderlines';

  constructor(private http: HttpClient) {}

  /** GET /api/orderlines */
  getAll(): Observable<OrderLine[]> {
    return this.http.get<OrderLine[]>(this.baseUrl);
  }

  /** GET /api/orderlines/getbyid/{id} */
  getById(id: number): Observable<OrderLine> {
    return this.http.get<OrderLine>(`${this.baseUrl}/getbyid/${id}`);
  }

  /** POST /api/orderlines */
  create(body: OrderLineRequestPayload): Observable<OrderLine> {
    return this.http.post<OrderLine>(this.baseUrl, body);
  }

  /** PUT /api/orderlines/{id} */
  update(id: number, body: OrderLineRequestPayload): Observable<OrderLine> {
    return this.http.put<OrderLine>(`${this.baseUrl}/${id}`, body);
  }

  /** DELETE /api/orderlines/{id} */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
