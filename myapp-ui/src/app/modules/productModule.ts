export interface Product {
  id: number;
  user_id: number;
  product_name?: string;
  product_category?: string;
  customCategory?: string;
  category_id?:number;
  expiry_date?: Date;
  open_date?: Date;
  number_of_days?: number;
}