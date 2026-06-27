export interface Product {
  id: number;
  name: string;
  description: string;
  sku: string;
  price: number;
  quantity: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductsResponse {
  success: boolean;
  message: string;
  data: Product[];
}

export interface CreateProductRequest {
  name: string;
  description: string;
  sku: string;
  price: number;
  quantity: number;
  isActive: boolean;
}

export interface UpdateProductRequest extends CreateProductRequest {}
