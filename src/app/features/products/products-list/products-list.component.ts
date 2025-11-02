import {Component, OnInit} from '@angular/core';
import {CommonModule, CurrencyPipe, NgFor} from '@angular/common';
import {Product} from '../../../core/models/product.model';
import {ProductService} from '../../../core/services/product.service';
import {CartService} from '../../../core/services/cart.service';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, NgFor, CurrencyPipe],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];
  loading = false;
  error?: string;

  constructor(private productsApi: ProductService, private cart: CartService) {}

  ngOnInit(): void {
    this.loading = true;
    this.productsApi.getAll().subscribe({
      next: (data) => this.products = data,
      error: (err) => this.error = err?.message || 'Eroare la HTTP',
      complete: () => this.loading = false
    });
  }

  add(p: Product) {
    this.cart.add(p, 1);
  }
}
