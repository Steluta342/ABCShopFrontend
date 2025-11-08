
/*import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [App],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, CommonModule],
  bootstrap: [App]
})
export class AppModule {}*/


/*Pentru ca folosesc standalone components, atunci nu mai folosesc AppModule. În locul lui:
 Pun directivele/pachetele de template direct în decoratorul fiecărei componente
(acolo unde am @Component({...})):

 CommonModule pentru *ngIf, *ngFor, date, async etc.

 FormsModule dacă folosesc [(ngModel)]

 RouterModule/RouterOutlet dacă am rute/routerLink

 Configurez provider-ele globale (HTTP, Router, etc.)
  în main.ts sau în app.config.ts și bootez cu bootstrapApplication.*/
