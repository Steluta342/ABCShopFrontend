import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {OrderLine} from '../models/order-line.model';

@Injectable({
  providedIn: 'root',
})
export class OrderLineService {
  private apiUrl = '/api/order-line';
  constructor(private http: HttpClient) { }

  // Get
  getAll(): Observable<OrderLine>{
    return this.http.get<OrderLine>(this.apiUrl);
  }

  // Get
  getById (id: number): Observable<OrderLine>{
    return this.http.get<OrderLine>(`${this.apiUrl}/${id}`);
  }

  // Post
  create(orderLine: OrderLine): Observable<OrderLine>{
    const {id, ...body} = orderLine;
    return this.http.post<OrderLine>(`${this.apiUrl}/${id}`, body);
  }

  // Update
  update(id: number, orderLine: OrderLine): Observable<OrderLine>{
    const {id: _ignore,  ...body} = orderLine;
    return this.http.put<OrderLine>(`${this.apiUrl}/${id}`, body);
  }
}
