import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-custome-component',
  imports: [FormsModule],
  templateUrl: './custome-component.html',
  styleUrl: './custome-component.css',
})
export class CustomeComponent {
  product_category = '';

Submit(){}
}
