import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config';

// importurile necesare pentru locale RO
import { registerLocaleData } from '@angular/common';
import localeRo from '@angular/common/locales/ro';

// înregistrăm locale-ul românesc
registerLocaleData(localeRo, 'ro-RO');

bootstrapApplication(App, appConfig)
  .catch(err => console.error(err));
