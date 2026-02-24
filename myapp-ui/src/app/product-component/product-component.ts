import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-product-component',
  imports: [FormsModule, DialogModule,ButtonModule,SelectModule   ],
  templateUrl: './product-component.html',
  styleUrl: './product-component.css',
})


export class ProductComponent {
 product_name?:string;
  product_category = '';
  product_subcategory = '';
  expairy_date= new Date();
  open_date=new Date();
  number_of_days?:number;
  products: any[] = [];

  visible: boolean = false;
  
  Submit(){
    debugger
    console.log(this.product_name,this.product_category,this.product_subcategory,this.expairy_date,this.open_date,this.number_of_days)
  }

  showDialog() {
        this.visible = true;
    }


categories = [
  { label: 'Groceries', value: 'Groceries' },
  { label: 'Medicine', value: 'Medicine' },
  { label: 'Cosmetics', value: 'Cosmetics' },
  { label: 'Others', value: 'Others' }
];

onCategoryChange(event: any) {
  if (event.value === 'Others') {
    this.showDialog();
  }
}



}
