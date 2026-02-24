import { Component } from '@angular/core';
import { ProductComponent } from "../product-component/product-component";
import { ListComponent } from "../list-component/list-component";

@Component({
  selector: 'app-home-component',
  imports: [ProductComponent, ListComponent],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent {
activeTab = 'product';

}
