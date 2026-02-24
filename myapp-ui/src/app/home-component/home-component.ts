import { Component } from '@angular/core';
import { ProductComponent } from "../product-component/product-component";
import { ListComponent } from "../list-component/list-component";
import { CustomeComponent } from '../custome-component/custome-component';

@Component({
  selector: 'app-home-component',
  imports: [ProductComponent, ListComponent,CustomeComponent],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent {
activeTab = 'product';

}
