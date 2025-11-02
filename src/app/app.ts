import { Component, OnInit } from '@angular/core';
import { ProductService } from './core/services/product.service';
import { Product } from './core/models/product.model';
import {CommonModule, NgFor, NgIf} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, FormsModule],
  templateUrl: './app.html'
})
export class App implements OnInit {
  products: Product[] = [];
  loading = false;
  error?: string;

  constructor(private productService: ProductService) {}

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
}
