export interface StockHistory {
  id: number;
  productId: number;
  action: "IN" | "OUT" | "ORDER" | "CANCEL";
  quantity: number;
  note: string | null;
  createdAt: string;

  product: {
    id: number;
    name: string;
    sku: string;
  };
}

export interface StockHistoryResponse {
  success: boolean;
  message: string;
  data: StockHistory[];
}
export interface StockInRequest {
  productId: number;
  quantity: number;
  note?: string;
}

export interface StockOutRequest {
  productId: number;
  quantity: number;
  note?: string;
}
