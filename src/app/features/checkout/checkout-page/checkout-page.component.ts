import { Component, OnInit } from '@angular/core';
import { AddressService } from '../../../core/services/address.service';
import { Address } from '../../../core/models/address.model';
import { Router } from '@angular/router';
import { CartService, CartLine } from '../../../core/services/cart.service';
import { OrderService } from '../../../core/services/order.service';
import { OrderRequestPayload, nowLocalIso } from '../../../core/models/order-payload.model';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf, NgFor],
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {
  userId = 1; // temporar
  deliveryAddressId?: number;
  userAddressId?: number;

  addresses: Address[] = [];

  // form pentru adresă nouă
  showNewAddressForm = false;
  newAddress: Address = {
    name: '',
    country: '',
    city: '',
    street: '',
    zipCode: ''
  };

  constructor(
    public cart: CartService,
    private orders: OrderService,
    private router: Router,
    private addressService: AddressService
  ) {}

  ngOnInit(): void {
    this.addressService.getByUserId(this.userId).subscribe({
      next: (data) => {
        console.log('Adrese pentru user', this.userId, data);
        this.addresses = data;
      },
      error: (err) => {
        console.error('Eroare la preluarea adreselor:', err);
      }
    });
  }

  // 🔹 deschide/închide formularul
  toggleNewAddressForm(): void {
    this.showNewAddressForm = !this.showNewAddressForm;
  }

  // 🔹 salvează o adresă nouă prin backend
  saveNewAddress(): void {
    if (!this.newAddress.name?.trim()
      || !this.newAddress.country
      || !this.newAddress.city
      || !this.newAddress.street
      || !this.newAddress.zipCode) {
      alert('Completează toate câmpurile adresei (inclusiv numele).');
      return;
    }

    const payload: Address = {
      ...this.newAddress,
      name: this.newAddress.name.trim()
    };

    this.addressService.create(this.newAddress).subscribe({
      next: (created) => {
        // adăugăm noua adresă în listă
        this.addresses.push(created);
        // o setăm automat ca adresă de livrare
        this.deliveryAddressId = created.id;

        // resetăm formularul
        this.newAddress = {
          name: '',
          country: '',
          city: '',
          street: '',
          zipCode: ''
        };
        this.showNewAddressForm = false;
      },
      error: (err) => {
        console.error('Eroare creare adresă:', err);
        alert(err?.error?.message || 'Nu am putut salva adresa.');
      }
    });
  }

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
      orderDate: nowLocalIso(),
      status: 'NEW',
      orderLines: this.cart.lines.map(l => ({
        quantity: l.quantity,
        product: { id: l.product.id! }
      }))
    };

    console.log('OrderRequest trimis:', body);

    this.orders.create(body).subscribe({
      next: (resp) => {
        alert('Comanda a fost înregistrată cu succes!');
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
