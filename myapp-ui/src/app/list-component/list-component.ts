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
import { Select } from "primeng/select";
// import { Product } from '../modules/productModule';

@Component({
  selector: 'app-list-component',
  imports: [CommonModule, TableModule, ProgressSpinnerModule, FormsModule, ButtonModule, DatePickerModule, ToastModule, Select],
  templateUrl: './list-component.html',
  styleUrl: './list-component.css',
  standalone: true,
  providers: [MessageService]
})

export class ListComponent implements OnInit {

  loginUserId: any;
  product_category: number | null = null;
  showDialog: boolean = false;

  productList: Product[] = [];
  loading: boolean = false;
  totalRecords: number = 0;
  editingRow: Product | null = null;
  //  targetExpDate:Date | null=null;
  categories: any;
  category_id?: number | null = null;


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
    this.userService.GetAllCategory().subscribe(data => {
      this.categories = data;
      console.log(this.categories);

      this.categories.push({
        id: 0,
        category_name: 'Others'
      });
    });
  }

  onCategoryChange(event: any) {
    //debugger
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
    //debugger
    this.loading = true;
    this.userService.getProductbyId(this.loginUserId).subscribe({
      next: (res: any) => {
        //debugger
        setTimeout(() => {
          this.productList = res;
          this.totalRecords = res.length;
          this.loading = false;
        });
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  onRowEditInit(row: any) {
    debugger

    this.editingRow = row;
    if (row.expiry_date)
      row.expiry_date = new Date(row.expiry_date);
    if (row.open_date)
      row.open_date = new Date(row.open_date);
    if (row.category_id) {
      row.category_id = row.category_id;
      row.category
        = row.category
        ;
    }
  }

  onRowEditSave(row: any) {
    this.loading = true; // show loader if needed

    this.userService.updateProduct(row).subscribe({
      next: (res: any) => {
        // Show success toast
        this.messageService.add({
          severity: 'success',
          summary: 'Updated',
          detail: `Product ${row.product_name} updated successfully`
        });

        // Reload table data
        this.getAllProductbyId(row.id);

        this.loading = false;
      },
      error: () => {
        this.loading = false;

        // Show error toast
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to update product'
        });
      }
    });

    // Clear editing state
    this.editingRow = null;
  }

  onRowEditCancel(row: any) {
    this.editingRow = null; // Revert changes if needed
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

  //   getProducts() {
  //   this.productService.getProducts().subscribe(res => {
  //     setTimeout(() => {
  //       this.products = res;
  //     });
  //   });
  // }

}
