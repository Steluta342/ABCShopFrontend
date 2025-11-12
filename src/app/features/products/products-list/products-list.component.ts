import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { Product } from '../../../core/models/product.model';
import { ProductService } from '../../../core/services/product.service';
import { CartService } from '../../../core/services/cart.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription, combineLatest, map } from 'rxjs';
import { CategoryFilterComponent } from '../../categories/category-filter.component';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, NgFor, RouterLink, CategoryFilterComponent],
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  loading = false;
  error?: string;

  private sub?: Subscription;

  constructor(
    private productsApi: ProductService,
    private cart: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loading = true;

    const products$ = this.productsApi.getAll();

    this.sub = combineLatest([products$, this.route.queryParamMap]).pipe(
      map(([items, qp]) => {
        const idParam = qp.get('categoryId');
        const categoryId = idParam ? Number(idParam) : NaN;

        if (!categoryId) {
          return items; // fără filtru
        }

        // presupunem p.category?.id și p.category?.parent?.id
        return items.filter((p: any) => {
          const id = p?.category?.id ?? null;
          const parentId = p?.category?.parent?.id ?? null;
          return id === categoryId || parentId === categoryId;
        });
      })
    ).subscribe({
      next: (filtered) => {
        this.products = filtered;
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.message || 'Eroare la HTTP';
        this.loading = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  add(p: Product) {
    this.cart.add(p, 1);
  }
}
