import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
// dacă ai rute: import { provideRouter } from '@angular/router'; import { routes } from './app-routing-module';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    // provideRouter(routes),
  ],
};
