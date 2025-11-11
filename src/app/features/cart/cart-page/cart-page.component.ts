import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService, CartLine } from '../../../core/services/cart.service';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css',
})
export class CartPageComponent implements OnInit {

  // Observable-ul din service (va fi setat în ngOnInit)
  lines$!: Observable<CartLine[]>;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.lines$ = this.cartService.lines$;
  }

  // Totalul îl luăm direct din getter-ul service-ului
  get total(): number {
    return this.cartService.total;
  }

  changeQty(line: CartLine, delta: number): void {
    const newQty = line.quantity + delta;
    const productId = line.product.id;   // poate fi number | undefined

    if (productId == null) {
      // dacă nu are id, nu facem nimic
      return;
    }

    if (newQty <= 0) {
      // dacă scade sub 1, scoatem produsul din coș
      this.cartService.remove(productId);
    } else {
      this.cartService.update(productId, newQty);
    }
  }

  remove(line: CartLine): void {
    const productId = line.product.id;
    if (productId == null) return;

    this.cartService.remove(productId);
  }

  clear(): void {
    this.cartService.clear();
  }
}
