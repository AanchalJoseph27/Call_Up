import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Table, TableModule } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-list-component',
  imports: [CommonModule, TableModule, ProgressSpinnerModule],
  templateUrl: './list-component.html',
  styleUrl: './list-component.css',
  standalone: true,
})

export class ListComponent implements OnInit {

  loginUserId: any;

  productList: any[] = [];
  loading: boolean = false;
  totalRecords: number = 0;

  constructor(private userService: UserService,
    private router: Router
  ) {
    this.loginUserId = sessionStorage.getItem("loginUserId");
    this.loading = true;
  }


  ngOnInit() {}



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

  //   getProducts() {
  //   this.productService.getProducts().subscribe(res => {
  //     setTimeout(() => {
  //       this.products = res;
  //     });
  //   });
  // }

}
