import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutPageComponent } from './features/checkout/checkout-page/checkout-page.component';

const routes: Routes = [
  { path: 'checkout', component: CheckoutPageComponent },
  // alte rute (products, cart etc)
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
