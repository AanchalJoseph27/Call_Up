import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  standalone:true,
  imports: [CommonModule, FormsModule] 
})
export class UserComponent implements OnInit {
  name = '';
  email = '';
  users: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  save() {
    this.userService.createUser({ name: this.name, email: this.email })
      .subscribe(() => this.loadUsers());
  }

  saveUser() {
  const user = { name: 'Aanchal', email: 'test@example.com' };
  this.userService.createUser(user).subscribe({
    next: res => console.log('Saved!', res),
    error: err => console.error('Error', err)
  });
}


  loadUsers() {
    this.userService.getUsers().subscribe(res => this.users = res as any[]);
  }
}
