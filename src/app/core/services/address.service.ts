import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Address } from '../models/address.model';

@Injectable({ providedIn: 'root' })
export class AddressService {

  private readonly apiUrl = '/api/addresses';

  constructor(private http: HttpClient) {}

  // GET /api/addresses
  getAll(): Observable<Address[]> {
    return this.http.get<Address[]>(this.apiUrl);
  }

  // GET /api/addresses/getbyid/{id}
  getById(id: number): Observable<Address> {
    return this.http.get<Address>(`${this.apiUrl}/getbyid/${id}`);
  }

  // GET /api/addresses/getbyname/{addressName}
  getByName(addressName: string): Observable<Address[]> {
    return this.http.get<Address[]>(
      `${this.apiUrl}/getbyname/${encodeURIComponent(addressName)}`
    );
  }

  // GET /api/addresses/getbyuserid/{userId}
  getByUserId(userId: number): Observable<Address[]> {
    return this.http.get<Address[]>(`${this.apiUrl}/getbyuserid/${userId}`);
  }

  // POST /api/addresses
  create(address: Address): Observable<Address> {
    // nu trimitem id la creare
    const { id, ...body } = address;
    return this.http.post<Address>(this.apiUrl, body);
  }

  // PUT /api/addresses/{id}
  update(id: number, address: Address): Observable<Address> {
    const { id: _ignore, ...body } = address;
    return this.http.put<Address>(`${this.apiUrl}/${id}`, body);
  }

  // DELETE /api/addresses/{id}
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
