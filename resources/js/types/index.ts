
export interface Category{
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
}

export interface Product {
  id: string
  name: string
  category_id: string
  description: string
  company: string
  price: string
  created_at: Date;
  updated_at: Date;
  image: string | null;
}

export interface ProductVariant {
  id: string;
  variant_name: string;
  product_id: string;
  image: string;
  stock: string;
  created_at: Date;
  updated_at: Date;
}

export interface Order {
  id: string;
  user_id: string
  address : string;
  phone:string;
  postal_code: string;
  status: string;
  url: string;
  total : string;
  payment_method: string;
  payment_channel: string;
  created_at: Date;
  updated_at: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  email_verified_at: Date;
  password: string;
  role: string;
  remember_token: string;
  created_at: Date;
  updated_at: Date;
}