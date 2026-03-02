import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Lara from '@primeng/themes/lara';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(FormsModule),
     provideRouter(routes),
     providePrimeNG({
      theme: {
        preset: Lara
      }
    })
   
  ]
});
