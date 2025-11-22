import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ProductService } from './core/services/product.service';
import { Product } from './core/models/product.model';
import { CartService } from './core/services/cart.service';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html'
})
export class App implements OnInit {
  products: Product[] = [];
  loading = false;
  error?: string;

  constructor(
    private productService: ProductService,
    public cart: CartService,
    public auth: AuthService          // îl facem public, îl folosim în template
  ) {}

  get cartCount(): number {
    return this.cart.lines.reduce((sum, line) => sum + line.quantity, 0);
  }

  ngOnInit(): void {
    this.loading = true;
    this.productService.getAll().subscribe({
      next: (data) => {
        console.log('Produse primite:', data);
        this.products = data;
      },
      error: (err) => {
        console.error('Eroare HTTP:', err);
        this.error = err?.message || 'Eroare la HTTP';
      },
      complete: () => (this.loading = false)
    });
  }

  onLogout(): void {
    this.auth.logout();
  }
}
