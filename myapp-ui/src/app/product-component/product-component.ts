import { Component, OnInit } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { CardModule, Card } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

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


export class ProductComponent implements OnInit {
  product_name?: string;
  product_category: number | null = null;
  customCategory?: string;
  product_subcategory?: string;
  expiry_date : Date | null=null;
  open_date: Date | null = null;
  // open_date = new Date();
  number_of_days = 0;
  products: any[] = [];
  category_id?: number | null = null;
  categories: any;
  showDialog: boolean = false;
  userId: any;
  temp_product_category?: any;
  loginUserId: any;
  loginUserName: any;
  productList: any;


  constructor(private userService: UserService,
    private router: Router
  ) {
    this.loginUserId = sessionStorage.getItem("loginUserId");
    this.loginUserName = sessionStorage.getItem("loginUserName");
  }

  ngOnInit() {
    this.getAllCategories();
    // this.getAllProductbyId();
  }

  getAllCategories() {
    this.userService.GetAllCategory().subscribe(data => {
      this.categories = data;
      console.log(this.categories);

      this.categories.push({
        id: 0,
        category_name: 'Others'
      });
    });
  }

  getAllProductbyId() {
    this.userService.getProductbyId(this.loginUserId).subscribe(data => {
      this.productList = data;
      console.log(this.productList);
    })
  }

  Submit() {
    //debugger
    this.category_id = this.product_category

    console.log(this.loginUserId, this.product_name, this.category_id, this.expiry_date?.toISOString().split('T')[0], this.open_date?.toISOString().split('T')[0], this.number_of_days)

    const product = { user_id: this.loginUserId, product_name: this.product_name, category_id: this.category_id, expiry_date: this.expiry_date?.toISOString().split('T')[0], open_date: this.open_date?.toISOString().split('T')[0], numberofdays: this.number_of_days };
    this.userService.createProduct(product).subscribe({
      next: res => {
        console.log('Saved!', res)
        if (res != null) {
          window.location.reload();
        }
      },
      error: err => console.error('Error', err)
    });
  }

  submitCustomCategory() {
    // //debugger
    const category = { category_name: this.customCategory };
    this.userService.createCategory(category).subscribe({
      next: (res) => {
        this.temp_product_category = res;
        console.log(this.temp_product_category.id);
        this.product_category = this.temp_product_category.id;
        this.category_id = this.temp_product_category.id;
        this.getAllCategories();
      },
      error: err => console.error('Error', err)
    });
    this.showDialog = false;
  }

  onCategoryChange(event: any) {
    //debugger
    console.log(event.value);
    this.category_id = event.value
    if (event.value === 0) {
      this.showDialog = true;
    }
  }
  hideDialog(){
      this.product_category= null;

  }

  
}
