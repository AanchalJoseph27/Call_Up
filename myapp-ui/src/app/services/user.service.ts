import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public loginUserId: any;
    
  apiUrl = 'https://localhost:7091/api/users';
  registerapiUrl = 'https://localhost:7091/api/users/register';
  loginapiUrl = 'https://localhost:7091/api/users/login';
  productapiUrl = 'https://localhost:7091/api/users/product';
  expproductapiUrl = 'https://localhost:7091/api/users/productexp';
  expproductapiUrl1 = 'https://localhost:7091/api/users/productexp1';
  categoryapiUrl = 'https://localhost:7091/api/users/category';

  constructor(private http: HttpClient) {
    this.getUsers();
  }

  createUser(user: any) {
    // debugger
    return this.http.post(this.registerapiUrl, user);
  }

  getUsers() {
    return this.http.get(this.apiUrl);
  }
  getUsersbyId(Id:any) {
    return this.http.get(this.apiUrl,Id);
  }

  loginUser(login:any){
    // debugger
    return this.http.post(this.loginapiUrl, login);
    // debugger

  }
  //category
  createCategory(category:any){
    return this.http.post(this.categoryapiUrl, category);
  }
  GetAllCategory(){
    return this.http.get(this.categoryapiUrl);

  }
  //product
   createProduct(product:any){
    debugger
    return this.http.post(this.productapiUrl, product);
  }
  getProdect(){
    return this.http.get(this.productapiUrl);
  }
 getProductbyId(Id: any) {
  return this.http.get(`${this.productapiUrl}/${Id}`);
}

 getExpProductbyId(Id: any) {
  return this.http.get(`${this.expproductapiUrl}/${Id}`);
}
 getExpProductbyId1(Id: any) {
  return this.http.get(`${this.expproductapiUrl1}/${Id}`);
}
}
