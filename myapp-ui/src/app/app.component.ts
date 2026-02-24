import { Component } from '@angular/core';
import { UserComponent } from './user.component/user.component';
import { ProductComponent } from './product-component/product-component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],  
 templateUrl: './app.html'
})
export class AppComponent { }
