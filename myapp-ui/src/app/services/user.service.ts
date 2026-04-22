import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../modules/productModule';
import { Category } from '../modules/categoryModule';

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
  deleteproductUrl = 'https://localhost:7091/api/users/DeleteProduct';
  updateproductapiUrl = 'https://localhost:7091/api/users/UpdateProduct';
  deleteAccountUrl = 'https://localhost:7091/api/users/DeleteAccount';
  categorybyidapiUrl = 'https://localhost:7091/api/users/CategoryById';
  deleteOverProductsbyuseridapiUrl = 'https://localhost:7091/api/users/DeleteExpOverProduct';





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
  getUsersbyId(Id: any) {
    return this.http.get(this.apiUrl, Id);
  }

  loginUser(login: any) {
    return this.http.post(this.loginapiUrl, login);

  }
  //category
  createCategory(category: any) {
    return this.http.post(this.categoryapiUrl, category);
  }

  GetAllCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoryapiUrl);
  }

  GetAllCategoryById(Id: any): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.categorybyidapiUrl}/${Id}`);
  }
  //product
  createProduct(product: Product) {
    return this.http.post(this.productapiUrl, product);
  }
  getProdect() {
    return this.http.get(this.productapiUrl);
  }
  getProductbyId(Id: any): Observable<Product[]> {
    return this.http.get<any[]>(`${this.productapiUrl}/${Id}`);
  }

  getExpProductbyId(Id: any) {
    return this.http.get(`${this.expproductapiUrl}/${Id}`);
  }
  getExpProductbyId1(Id: any): Observable<Product[]> {
    return this.http.get<any[]>(`${this.expproductapiUrl1}/${Id}`);
  }

  deleteProduct(Id: any) {
    return this.http.delete(`${this.deleteproductUrl}/${Id}`);
  }
  updateProduct(product: Product) {
    return this.http.put(`${this.updateproductapiUrl}/${product.id}`, product);

  }

  deleteAccount(Id: any) {
    return this.http.delete(`${this.deleteAccountUrl}/${Id}`);
  }
  DeleteExpOver(userId:any){
    return this.http.delete(`${this.deleteOverProductsbyuseridapiUrl}/${userId}`);

  }
}
