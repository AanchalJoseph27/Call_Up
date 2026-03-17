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

  ngOnInit() {  }


  login() {
    const login = { Email: this.user_name, Password: this.password };

    const loginResult = this.userService.loginUser(login).subscribe({
      next: (response) => {
        this.data = response;
        this.processData(this.data);
      },
      error: (err) => console.error('Error fetching data', err),
    });
  }

  processData(data: any) {
    if (data != null) {
      // this.userService.loginUserId = data.id;
      sessionStorage.setItem("loginUserId", data.id);
      this.router.navigate(['/product']);
    }
  }

  showSignup() {
    this.isLogin = !this.isLogin;
  }

  saveUser() {
    const user = { Name: this.full_name, Email: this.email_id, Password: this.password };
    this.userService.createUser(user).subscribe({
      next: res => console.log('Saved!', res),
      error: err => console.error('Error', err)
    });
    this.isLogin = !this.isLogin;

  }
}
