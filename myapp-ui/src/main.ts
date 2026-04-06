import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Lara from '@primeuix/themes/lara';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(FormsModule),
     provideRouter(routes),
    providePrimeNG({
      theme: {
        preset: Lara
      }
    }),
     provideAnimations(),  // required for PrimeNG
    MessageService
  ]
});
