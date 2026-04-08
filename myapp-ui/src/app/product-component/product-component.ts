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
import { Product } from '../modules/productModule';
import { Category } from '../modules/categoryModule';

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
  product_category: any;
  customCategory?: string;
  expiry_date: Date | null = null;
  open_date: Date | null = null;
  userId: any;
  numberofdays
    = 0;
  category_id?: number | null = null;
  categories: Category[] = [];
  products: Product[] = [];
  showDialog: boolean = false;
  temp_product_category?: any;
  tempCategoryList?: any;
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
  }

  getAllCategories() {
    this.userService.GetAllCategoryById(this.loginUserId).subscribe((data: Category[]) => {
      this.categories = data;

      this.categories.push({
        id: 0,
        category_name: 'Others',
        user_id: this.loginUserId
      });
      console.log(this.categories);
    });
    return (this.categories);
  }

  getAllProductbyId() {
    this.userService.getProductbyId(this.loginUserId).subscribe(data => {
      this.productList = data;
      console.log(this.productList);
    })
  }

  Submit() {
    const product: Omit<Product, 'id'> = {
      user_id: this.loginUserId, product_name: this.product_name, category_id: this.category_id, expiry_date: this.expiry_date!, open_date: this.open_date!, numberofdays
        : this.numberofdays
        ?? 0
    };

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
    const category = { category_name: this.customCategory, user_id: this.loginUserId };
    this.userService.createCategory(category).subscribe({
      next: (res) => {
        this.temp_product_category = res;
        console.log(this.temp_product_category.id);
        this.product_category = this.temp_product_category;
        if (this.temp_product_category) {
          this.tempCategoryList = this.getAllCategories();
          this.tempCategoryList.push(this.temp_product_category);
          this.tempCategoryList.forEach((item: Category) => {
            if (item.id === this.temp_product_category.id) {
              this.category_id = item.id;
            }
          });

        }

      },
      error: err => console.error('Error', err)
    });
    this.showDialog = false;
    this.customCategory = "";

  }

  onCategoryChange(event: any) {
    console.log(event.value);
    this.category_id = event.value
    if (event.value === 0) {
      this.showDialog = true;
    }
  }
  hideDialog() {
    this.product_category = null;

  }


}
