import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  // aici nu mai folosim direct URL-ul backendului, FĂRĂ http://localhost:8080
  private readonly apiUrl = '/api/categories';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }

  getById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/${id}`);
  }

  create(category: Category): Observable<string> {
    return this.http.post(this.apiUrl, category, { responseType: 'text' });
  }

  update(id: number, category: Category): Observable<string> {
    return this.http.put(`${this.apiUrl}/${id}`, category, { responseType: 'text' });
  }

  delete(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }
}
