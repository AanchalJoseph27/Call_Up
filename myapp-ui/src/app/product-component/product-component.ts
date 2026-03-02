import { Component } from '@angular/core';
import { CommonModule,  } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { CardModule, Card } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
  selector: 'app-product-component',
  imports: [FormsModule,
    SelectModule,
    DatePickerModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    Card,
    DialogModule,
    CommonModule
  ],
  templateUrl: './product-component.html',
  styleUrl: './product-component.css',
  standalone: true
})


export class ProductComponent {
  product_name?: string;
  product_category?: string;
  customCategory?: string;
  product_subcategory?: string;
  expairy_date = new Date();
  open_date = new Date();
  number_of_days?: number;
  products: any[] = [];

  showDialog: boolean = false;

  Submit() {
    debugger
    console.log(this.product_name, this.product_category, this.product_subcategory, this.expairy_date, this.open_date, this.number_of_days)
  }

 


  categories = [
    { label: 'Groceries', value: 'Groceries' },
    { label: 'Medicine', value: 'Medicine' },
    { label: 'Cosmetics', value: 'Cosmetics' },
    { label: 'Others', value: 'Others' }
  ];

  submitCustomCategory(){}

  onCategoryChange(event: any) {
    debugger
      console.log(this.product_category);
    if (event.value === 'Others') {
      this.showDialog=true;
    }
  }



}
