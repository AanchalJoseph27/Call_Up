import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = 'https://localhost:7091/api/users';

  constructor(private http: HttpClient) {}

  createUser(user: any) {
    return this.http.post(this.apiUrl, user);
  }

  getUsers() {
    return this.http.get(this.apiUrl);
  }

  loginUser(login:any){
    return this.http.post(this.apiUrl, login);

  }
}
