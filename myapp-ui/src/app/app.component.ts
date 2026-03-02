import { Component } from '@angular/core';
import { UserComponent } from './user.component/user.component';
import { ProductComponent } from './product-component/product-component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from "./home-component/home-component";

@Component({
  selector: 'app-root',
  imports: [RouterModule, HomeComponent],  
 templateUrl: './app.html'
})
export class AppComponent { }
