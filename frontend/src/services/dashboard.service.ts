import axiosInstance from "@/lib/axios";
import { DashboardResponse } from "@/types/dashboard";

class DashboardService {
  async getDashboardStats(): Promise<DashboardResponse> {
    const response = await axiosInstance.get<DashboardResponse>("/dashboard");
    return response.data;
  }
}

export default new DashboardService();
