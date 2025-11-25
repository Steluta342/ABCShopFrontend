import { Component, OnInit } from '@angular/core';
import { AddressService } from '../../../core/services/address.service';
import { Address } from '../../../core/models/address.model';
import { Router } from '@angular/router';
import { CartService, CartLine } from '../../../core/services/cart.service';
import { OrderService } from '../../../core/services/order.service';
import {nowLocalIso, OrderRequestPayload} from '../../../core/models/order-payload.model';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';



@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf, NgFor],
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {
  userId!: number;
  deliveryAddressId?: number;
  userAddressId?: number;
  addresses: Address[] = [];
  cartItems: { productId: number; quantity: number }[] = [];
  status: String = 'NEW';

  // formular pentru adresă nouă
  showNewAddressForm = false;

  newAddress: Address = {
    name: '',
    country: '',
    city: '',
    street: '',
    zipCode: '',
    userId: 0              //  userId va fi setat în ngOnInit()
  };

  constructor(
    public cart: CartService,
    private orders: OrderService,
    private router: Router,
    private addressService: AddressService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const id = this.authService.getUserId();

    if (!id) {
      console.error('Niciun utilizator logat!');
      return;
    }
    this.userId = id;
    this.newAddress.userId = id;
    this.loadAddresses(id);
  }

  loadAddresses(userId: number) {
    this.addressService.getByUserId(userId).subscribe({
      next: (data) => this.addresses = data,
      error: (err) => console.error('Eroare la adrese:', err)
    });
  }

  // deschide/închide formularul
  toggleNewAddressForm(): void {
    this.showNewAddressForm = !this.showNewAddressForm;
  }

  saveNewAddress(): void {
    if (
      !this.newAddress.name?.trim() ||
      !this.newAddress.country ||
      !this.newAddress.city ||
      !this.newAddress.street ||
      !this.newAddress.zipCode
    ) {
      alert('Completează toate câmpurile adresei.');
      return;
    }

    const payload: Address = {
      ...this.newAddress,
      name: this.newAddress.name.trim(),
      userId: this.userId
    };

    this.addressService.create(payload).subscribe({
      next: (created) => {
        this.addresses.push(created);
        this.deliveryAddressId = created.id;

        this.newAddress = {
          name: '',
          country: '',
          city: '',
          street: '',
          zipCode: '',
          userId: payload.userId   //  păstrăm userId!
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
      userId: this.userId,                             //  direct id-ul
      deliveryAddressId: this.deliveryAddressId!,      //  direct id-ul
      userAddressId: this.userAddressId ?? null,       //  poate fi null
      orderDate: nowLocalIso(),
      status: 'NEW',
      orderLines: this.cart.lines.map(l => ({
        quantity: l.quantity,
        product: { id: l.product.id! }                 // asta e ok pt backend
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
        alert(err?.error?.message || 'Avem o eroare la trimiterea comenzii.');
      }
    });
  }
}
