"use client";

import { useEffect, useState } from "react";
import {
  Package,
  ShoppingCart,
  CheckCircle,
  XCircle,
  AlertTriangle,
  IndianRupee,
} from "lucide-react";
import { toast } from "sonner";

import dashboardService from "@/services/dashboard.service";
import { DashboardStats } from "@/types/dashboard";
import StatCard from "@/components/dashboard/StatCard";

export default function DashboardPage() {
  const [dashboard, setDashboard] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await dashboardService.getDashboardStats();
      setDashboard(response.data);
    } catch {
      toast.error("Failed to load dashboard.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        Loading dashboard...
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        Failed to load dashboard.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Heading */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <p className="text-muted-foreground">
          Welcome back! Here's your inventory overview.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          title="Total Products"
          value={dashboard.totalProducts}
          icon={Package}
        />

        <StatCard
          title="Total Orders"
          value={dashboard.totalOrders}
          icon={ShoppingCart}
        />

        <StatCard
          title="Completed Orders"
          value={dashboard.completedOrders}
          icon={CheckCircle}
        />

        <StatCard
          title="Cancelled Orders"
          value={dashboard.cancelledOrders}
          icon={XCircle}
        />

        <StatCard
          title="Low Stock Products"
          value={dashboard.lowStockProducts}
          icon={AlertTriangle}
        />

        <StatCard
          title="Revenue"
          value={`₹${dashboard.totalRevenue}`}
          icon={IndianRupee}
        />
      </div>

      {/* Recent Orders */}
      <div className="rounded-lg border bg-card">
        <div className="border-b p-6">
          <h2 className="text-xl font-semibold">Recent Orders</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="p-4 text-left">Order ID</th>
                <th className="p-4 text-left">Customer</th>
                <th className="p-4 text-left">Amount</th>
                <th className="p-4 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {dashboard.recentOrders.map((order) => (
                <tr key={order.id} className="border-b last:border-none">
                  <td className="p-4">#{order.id}</td>

                  <td className="p-4">{order.user.name}</td>

                  <td className="p-4">₹{order.totalAmount}</td>

                  <td className="p-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        order.status === "COMPLETED"
                          ? "bg-green-100 text-green-700"
                          : order.status === "CANCELLED"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}

              {dashboard.recentOrders.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="p-8 text-center text-muted-foreground"
                  >
                    No recent orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
