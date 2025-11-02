import { Routes } from '@angular/router';
import { ProductsListComponent } from './features/products/products-list/products-list.component';
import { CheckoutPageComponent } from './features/checkout/checkout-page/checkout-page.component';
import { CartPageComponent } from './features/cart/cart-page/cart-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ProductsListComponent },
  { path: 'cart', component: CartPageComponent },
  { path: 'checkout', component: CheckoutPageComponent },
  { path: '**', redirectTo: '' }
];
