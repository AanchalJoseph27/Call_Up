import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { UserService } from './services/user.service'; // <-- correct path
import { AppComponent } from './app.component';
import { UserComponent } from './user.component/user.component';
import { SelectModule } from 'primeng/select';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ProductComponent } from './product-component/product-component';
import { HomeComponent } from './home-component/home-component';
import { ListComponent } from './list-component/list-component';
import { CustomeComponent } from './custome-component/custome-component';
// import { provideBrowserAnimations } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    

  ],
  imports: [
    BrowserModule,
    FormsModule,
    SelectModule,
    CommonModule,      // ✅ Always import CommonModule
    DialogModule,      // ✅ PrimeNG Dialog
    ButtonModule ,
    // provideBrowserAnimations ,
  ],
  providers: [UserService], // optional since providedIn: 'root'
})
export class AppModule { }
