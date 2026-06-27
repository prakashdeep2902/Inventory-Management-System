export interface RecentOrderUser {
  id: number;
  name: string;
  email: string;
}

export interface RecentOrder {
  id: number;
  userId: number;
  totalAmount: string;
  status: "PENDING" | "COMPLETED" | "CANCELLED";
  createdAt: string;
  updatedAt: string;
  user: RecentOrderUser;
}

export interface DashboardStats {
  totalProducts: number;
  activeProducts: number;
  totalOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  totalRevenue: number;
  lowStockProducts: number;
  recentOrders: RecentOrder[];
}

export interface DashboardResponse {
  success: boolean;
  message: string;
  data: DashboardStats;
}
