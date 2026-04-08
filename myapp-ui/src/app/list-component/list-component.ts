import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Table, TableModule } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Product } from '../modules/productModule';
import { DatePickerModule } from 'primeng/datepicker';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Select, SelectModule } from "primeng/select";
import { Category } from '../modules/categoryModule';
import { LazyLoadEvent } from 'primeng/api';
import { Dialog, DialogModule } from "primeng/dialog";
import { ProductComponent } from "../product-component/product-component";
import { Card, CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-list-component',
  imports: [CommonModule, TableModule, 
    ProgressSpinnerModule, FormsModule, 
    ButtonModule, DatePickerModule,
     ToastModule, Select, Dialog,  CardModule,
     SelectModule,
    DatePickerModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    Card,
    DialogModule,
    CommonModule
    ],
  templateUrl: './list-component.html',
  styleUrl: './list-component.css',
  standalone: true,
  providers: [MessageService]
})

export class ListComponent implements OnInit {

  loginUserId: any;
  product_category: number | null = null;
  showDialog: boolean = false;
  showDialogProduct: boolean = false;

  productList: Product[] = [];
  loading: boolean = false;
  totalRecords: number = 0;
  editingRow: Product | null = null;
  categories: Category[] = [];
  category_id?: number | null = null;
editrow:any=null;
editProduct: any = {};

  constructor(private userService: UserService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.loginUserId = sessionStorage.getItem("loginUserId");
    this.loading = true;
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

    });
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
  

  getAllProductbyId(event: any) {
    debugger
    this.loading = true;
    this.userService.getProductbyId(this.loginUserId).subscribe({
      next: (res: Product[]) => {
        setTimeout(() => {
          this.productList = res;       // assign the array
          this.totalRecords = res.length;
          this.loading = false;
          console.log("pro list=>", this.productList)

        });
      },
      error: () => {
        this.loading = false;
      }
    });
  }
  onRowEditInit(row: any) {
     this.editingRow = row;
  this.editProduct = { ...row };  
  this.showDialogProduct = true;
    if (this.editProduct?.id != null)
    {
      if (this.editProduct?.expiry_date)
         { 
          this.editProduct.expiry_date = new Date(row?.expiry_date); 
        }
      if (this.editProduct?.open_date) 
        { 
          this.editProduct.open_date = new Date(row.open_date); 
        }
      if (this.editProduct?.category_id) 
        {
          this.editProduct.category_id = row.category_id;
        }
    }

  }

  onRowEditSave(row: any) {
    this.loading = true; 

    this.userService.updateProduct(row).subscribe({
      next: (res: any) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Updated',
          detail: `Product ${row.product_name} updated successfully`
        });

        this.getAllProductbyId(row.id);

        this.loading = false;
      },
      error: () => {
        this.loading = false;

        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to update product'
        });
      }
    });

    this.showDialogProduct = false;
  this.editProduct = {};
  this.editingRow = null;
  }


  deleteRow(row: any) {
    console.log(row);
    this.userService.deleteProduct(row.id).subscribe({
      next: (res: any) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Product Deleted successfully'
        });
        this.getAllProductbyId(row.id);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Update failed'
        });
        this.loading = false;
      }
    });
  }
Submit(){}

 hideProductDialog() {
  this.showDialogProduct = false;
  this.editProduct = {};
  this.editingRow = null;
}

}
