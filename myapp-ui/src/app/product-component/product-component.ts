import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-product-component',
  imports: [FormsModule],
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

  
  Submit(){
    debugger
    console.log(this.product_name,this.product_category,this.product_subcategory,this.expairy_date,this.open_date,this.number_of_days)
  }

}
