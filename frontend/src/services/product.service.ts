import axiosInstance from "@/lib/axios";
import {
  ProductsResponse,
  CreateProductRequest,
  UpdateProductRequest,
} from "@/types/product";

class ProductService {
  async getProducts(): Promise<ProductsResponse> {
    const response = await axiosInstance.get<ProductsResponse>("/products");
    return response.data;
  }

  async createProduct(payload: CreateProductRequest) {
    const response = await axiosInstance.post("/products", payload);
    return response.data;
  }

  async updateProduct(id: number, payload: UpdateProductRequest) {
    const response = await axiosInstance.put(`/products/${id}`, payload);

    return response.data;
  }

  async deleteProduct(id: number) {
    const response = await axiosInstance.delete(`/products/${id}`);
    return response.data;
  }
}

export default new ProductService();
