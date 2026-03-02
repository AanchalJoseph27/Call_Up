import { Component, OnInit } from '@angular/core';
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
export class UserComponent implements OnInit {
  name = '';
  email = '';
  user_name: string = '';
  password: string = '';
  full_name: string = '';
  email_id: string = '';
  users: any[] = [];
  isLogin: boolean = true;

  constructor(private userService: UserService,
    private router: Router
  ) {
    // this.loadUsers();
    this.isLogin = true;

  }

  ngOnInit() {
    this.loadUsers();
  }

  save() {
    this.userService.createUser({ name: this.name, email: this.email })
      .subscribe(() => this.loadUsers());
  }
  login() {
    console.log(this.user_name, this.password)
    if (this.user_name == 'test' && this.password == 'test') {
      debugger
      this.router.navigate(['/product']);
      // this.userService.loginUser({ username: this.user_name, password: this.password })
      //   .subscribe(() => this.loadUsers());
    }
  }
  showSignup() {
    this.isLogin = !this.isLogin;
  }

  showLogin() { }

  saveUser() {
    console.log(this.full_name,this.email_id, this.password)

  const user = { name: this.full_name, email: this.email_id, password: this.password };
  this.userService.createUser(user).subscribe({
    next: res => console.log('Saved!', res),
    error: err => console.error('Error', err)
  });
  }


  loadUsers() {
    this.userService.getUsers().subscribe(res => this.users = res as any[]);
  }
}
