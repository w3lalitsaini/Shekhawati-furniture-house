export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

export interface ProductFilters {
  category?: string;
  material?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}
