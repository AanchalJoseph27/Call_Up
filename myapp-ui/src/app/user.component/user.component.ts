import { Component, Injectable, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
@Injectable({
  providedIn: 'root'
})

export class UserComponent implements OnInit {
  name = '';
  email = '';
  user_name: string = '';
  password: string = '';
  phonenumber:number | undefined;
  full_name: string = '';
  email_id: string = '';
  users: any[] = [];
  isLogin: boolean = true;
  data: any;
  constructor(private userService: UserService,
    private router: Router
  ) {
    this.isLogin = true;
  }

  ngOnInit() { 
     if (localStorage.getItem('token')) {
    this.router.navigate(['/product']);
  }
   }


  login() {
    const login = { email: this.user_name, password: this.password };

    const loginResult = this.userService.loginUser(login).subscribe({
      next: (response) => {
        this.data = response;
        this.processData(this.data);
        console.log(this.data)
      },
      error: (err) => {alert('Login failed! Please check your credentials.');}
    });
  }

  processData(data: any) {
    debugger
    if (data != null) {
      // this.userService.loginUserId = data.id;
      sessionStorage.setItem('token', data.token);
      sessionStorage.setItem("loginUserId", data.user.id);
      sessionStorage.setItem("loginUserName", data.user.name);
      this.router.navigate(['/product']);
    }
  }

  showSignup() {
    this.isLogin = !this.isLogin;
  }

  saveUser() {
    const user = { name: this.full_name, email: this.email_id, password: this.password, phonenumber:this.phonenumber};
    this.userService.createUser(user).subscribe({
      next: res => console.log('Saved!', res),
      error: err => console.error('Error', err)
    });
    this.isLogin = !this.isLogin;

  }
}
