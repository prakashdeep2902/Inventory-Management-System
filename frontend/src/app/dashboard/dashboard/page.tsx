"use client";

import { useAuth } from "@/hooks/useAuth";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <p className="mt-4">Welcome, {user?.name}</p>
    </div>
  );
}
