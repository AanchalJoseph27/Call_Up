import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-exp-list-component',
  imports: [CommonModule],
  templateUrl: './exp-list-component.html',
  styleUrl: './exp-list-component.css',
  standalone: true,

})
export class ExpListComponent {
  loginUserId: any;
  exp_productList: any;


   constructor(private userService: UserService,
    private router: Router
  ) { 
    this.loginUserId = sessionStorage.getItem("loginUserId");

   }

    ngOnInit() {
    debugger
     this.getAllExpProductbyId();

}
  
  getAllExpProductbyId(){
    this.userService.getExpProductbyId1(this.loginUserId).subscribe(data=>{
      this.exp_productList=data;
      console.log(this.exp_productList);
    })
  }
}
