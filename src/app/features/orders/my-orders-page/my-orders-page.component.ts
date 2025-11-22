import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf, NgFor, CurrencyPipe, DatePipe } from '@angular/common';
import { OrderService } from '../../../core/services/order.service';
import { Order } from '../../../core/models/order.model';

@Component({
  selector: 'app-my-orders-page',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, CurrencyPipe, DatePipe],
  templateUrl: './my-orders-page.component.html',
  styleUrls: ['./my-orders-page.component.css']
})
export class MyOrdersPageComponent implements OnInit {

  // TODO: pe viitor userId vine din auth; acum îl lăsăm fix
  userId = 1;

  orders: Order[] = [];
  loading = false;
  error?: string;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.loading = true;
    this.error = undefined;

    this.orderService.getByUser(this.userId).subscribe({
      next: (data) => {
        console.log('Comenzi pentru user', this.userId, data);
        this.orders = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Eroare la încărcarea comenzilor:', err);
        this.error = err?.error?.message || 'Nu am putut încărca comenzile.';
        this.loading = false;
      }
    });
  }

  // calculează totalul unei comenzi
  getOrderTotal(order: Order): number {
    return order.orderLines?.reduce((sum, line) => {
      const price = line.product?.price ?? 0;
      return sum + price * line.quantity;
    }, 0) ?? 0;
  }

  // total linie = preț * cantitate
  getLineTotal(orderLine: any): number {
    const price = orderLine.product?.price ?? 0;
    return price * orderLine.quantity;
  }
}
