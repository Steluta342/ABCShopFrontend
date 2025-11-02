import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

export interface CartLine {
  product: Product;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly KEY = 'abcshop_cart_v1';
  private _lines = new BehaviorSubject<CartLine[]>(this.load());
  lines$ = this._lines.asObservable();

  get lines(): CartLine[] { return this._lines.value; }

  get total(): number {
    return this.lines.reduce((s, l) => s + (l.product.price || 0) * l.quantity, 0);
  }

  add(p: Product, qty = 1) {
    const lines = [...this.lines];
    const i = lines.findIndex(l => l.product.id === p.id);
    if (i >= 0) lines[i] = { ...lines[i], quantity: lines[i].quantity + qty };
    else lines.push({ product: p, quantity: qty });
    this.persist(lines);
  }

  update(productId: number, qty: number) {
    this.persist(this.lines.map(l => l.product.id === productId ? { ...l, quantity: qty } : l));
  }

  remove(productId: number) {
    this.persist(this.lines.filter(l => l.product.id !== productId));
  }

  clear() { this.persist([]); }

  // --- helpers
  private load(): CartLine[] {
    try { return JSON.parse(localStorage.getItem(this.KEY) || '[]'); }
    catch { return []; }
  }
  private persist(lines: CartLine[]) {
    localStorage.setItem(this.KEY, JSON.stringify(lines));
    this._lines.next(lines);
  }
}
