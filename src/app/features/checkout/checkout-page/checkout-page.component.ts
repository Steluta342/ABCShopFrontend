import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService, CartLine } from '../../../core/services/cart.service';
import { OrderService } from '../../../core/services/order.service';
import { OrderRequestPayload, OrderLinePayload } from '../../../core/models/order-payload.model';
import {CommonModule, CurrencyPipe, NgFor, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf, NgFor,CurrencyPipe],
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent {
  userId = 1;//temporar pana fac partea de autentificare
  deliveryAddressId?: number;
  userAddressId?: number;

  constructor(
    public cart: CartService,
    private orders: OrderService,
    private router: Router
  ) {}

  // helpers coș
  inc(line: CartLine) {
    const id = line.product.id!;
    this.cart.update(id, line.quantity + 1);
  }

  dec(line: CartLine) {
    const id = line.product.id!;
    if (line.quantity <= 1) {
      this.cart.remove(id);
    } else {
      this.cart.update(id, line.quantity - 1);
    }
  }

  remove(line: CartLine) {
    const id = line.product.id!;
    this.cart.remove(id);
  }

  private nowLocalIso(): string {
    return new Date().toISOString().slice(0, 19);
  }

  placeOrder() {
    if (!this.deliveryAddressId) {
      alert('Alege adresa de livrare!');
      return;
    }
    if (!this.cart.lines.length) {
      alert('Coșul este gol.');
      return;
    }

    const body: OrderRequestPayload = {
      user: { id: this.userId },
      deliveryAddress: { id: this.deliveryAddressId },
      userAddress: this.userAddressId ? { id: this.userAddressId } : undefined,
      orderDate: this.nowLocalIso(),
      status: 'NEW',
      orderLines: this.cart.lines.map(l => ({
        quantity: l.quantity,
        product: { id: l.product.id! }
      }))
    };

    console.log('OrderRequest trimis:', body);

    this.orders.create(body).subscribe({
      next: (resp) => {
        alert('Comanda a fost înregistrată! \'Comanda trimisă! (simulat)\'');
        console.log('Răspuns backend:', resp);
        this.cart.clear();
        this.router.navigateByUrl('/products');
      },
      error: (err) => {
        console.error('Eroare creare comandă:', err);
        alert(err?.error?.message || 'Avem o eroare la trimiterea comenzii. \'Funcționalitatea reală va fi implementată după ce reparăm backend-ul.\'');
      }
    });
  }
}
