import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public loginUserId: any;

//   private productsSubject = new BehaviorSubject<any[]>([]);
// products$ = this.productsSubject.asObservable();
    
  apiUrl = 'https://localhost:7091/api/users';
  registerapiUrl = 'https://localhost:7091/api/users/register';
  loginapiUrl = 'https://localhost:7091/api/users/login';
  productapiUrl = 'https://localhost:7091/api/users/product';
  expproductapiUrl = 'https://localhost:7091/api/users/productexp';//email
  expproductapiUrl1 = 'https://localhost:7091/api/users/productexp1';
  categoryapiUrl = 'https://localhost:7091/api/users/category';

  constructor(private http: HttpClient) {
    this.getUsers();
  }

  createUser(user: any) {
    // //debugger
    return this.http.post(this.registerapiUrl, user);
  }

  getUsers() {
    return this.http.get(this.apiUrl);
  }
  getUsersbyId(Id:any) {
    return this.http.get(this.apiUrl,Id);
  }

  loginUser(login:any){
    // //debugger
    return this.http.post(this.loginapiUrl, login);
    // //debugger

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
    //debugger
    return this.http.post(this.productapiUrl, product);
  }
  getProdect(){
    return this.http.get(this.productapiUrl);
  }
 getProductbyId(Id: any): Observable<any[]> {
  return this.http.get<any[]>(`${this.productapiUrl}/${Id}`);
}

 getExpProductbyId(Id: any) {
  return this.http.get(`${this.expproductapiUrl}/${Id}`);
}
 getExpProductbyId1(Id: any): Observable<any[]> {
  return this.http.get<any[]>(`${this.expproductapiUrl1}/${Id}`);
}

//logout

// clearProducts(){
//    this.productsSubject.next([]); 
// }
}
