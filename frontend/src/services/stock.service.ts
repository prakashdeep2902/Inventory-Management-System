import api from "@/lib/axios";
import {
  StockHistory,
  StockHistoryResponse,
  StockInRequest,
  StockOutRequest,
} from "@/types/stock";

class StockService {
  async stockIn(payload: StockInRequest): Promise<void> {
    await api.post("/stock/in", payload);
  }

  async stockOut(payload: StockOutRequest): Promise<void> {
    await api.post("/stock/out", payload);
  }

  async getStockHistory(): Promise<StockHistory[]> {
    const { data } = await api.get<StockHistoryResponse>("/stock/history");
    return data.data;
  }
}

export default new StockService();
