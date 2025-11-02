import { Component } from '@angular/core';
import { CartService, CartLine } from '../../../core/services/cart.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css',
})
export class CartPageComponent {

}
