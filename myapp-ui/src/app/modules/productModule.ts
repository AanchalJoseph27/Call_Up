import { Category } from "./categoryModule";

export interface Product {
  id?: number;
  user_id: number;
  product_name?: string;
  category?:Category;
  // customCategory?: string;
  category_id?:number| null;
  expiry_date?: Date;
  open_date?: Date;
  numberofdays
?: number;
}