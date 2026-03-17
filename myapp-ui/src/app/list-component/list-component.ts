import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-component',
  imports: [CommonModule],
  templateUrl: './list-component.html',
  styleUrl: './list-component.css',
  standalone: true,
})

export class ListComponent implements OnInit{

  loginUserId:any;

   productList:any;

  constructor(private userService: UserService,
    private router: Router
  ) { 
    this.loginUserId = sessionStorage.getItem("loginUserId");

   }

  
  ngOnInit() {
    debugger
     this.getAllProductbyId();

}
  
  getAllProductbyId(){
    this.userService.getProductbyId(this.loginUserId).subscribe(data=>{
      this.productList=data;
      console.log(this.productList);
    })
  }

}
