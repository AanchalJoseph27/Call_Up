import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-exp-list-component',
  imports: [CommonModule, TableModule],
  templateUrl: './exp-list-component.html',
  styleUrl: './exp-list-component.css',
  standalone: true,

})
export class ExpListComponent {
  loginUserId: any;
  exp_productList: any[]=[];
  loading: boolean=false;
  totalRecords: number = 0;


   constructor(private userService: UserService,
    private router: Router
  ) { 
    this.loginUserId = sessionStorage.getItem("loginUserId");
    this.loading = true;

   }

    ngOnInit() {}
  
  getAllExpProductbyId(event: any){
    this.loading = true;
    this.userService.getExpProductbyId1(this.loginUserId)
    .subscribe({
    next: (res: any) => {
      //debugger
      setTimeout(() => {
      this.exp_productList = res;
      this.totalRecords = res.length;
      this.loading = false;
    });
    },
    error: () => {
      this.loading = false;
    }
  });
  }
}
