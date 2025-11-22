import { Routes } from '@angular/router';
import { ProductsListComponent } from './features/products/products-list/products-list.component';
import { CheckoutPageComponent } from './features/checkout/checkout-page/checkout-page.component';
import { CartPageComponent } from './features/cart/cart-page/cart-page.component';
import {CategoriesListComponent} from './features/categories/categories-list.component';
import {ProductDetailsComponent} from './features/products/product-details/product-details.component';
import { MyOrdersPageComponent } from './features/orders/my-orders-page/my-orders-page.component';
import {LoginComponent} from './auth/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, },
  { path: 'products', component: ProductsListComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'categories', component: CategoriesListComponent },
  { path: 'cart', component: CartPageComponent },
  { path: 'checkout', component: CheckoutPageComponent },
  { path: 'my-orders', component: MyOrdersPageComponent },
  { path: '**', redirectTo: '' }
];
