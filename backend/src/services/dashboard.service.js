import prisma from "../config/prisma.js";

export const getDashboardService = async () => {
  const [
    totalProducts,
    activeProducts,
    totalOrders,
    completedOrders,
    cancelledOrders,
    revenue,
    lowStockProducts,
    recentOrders,
  ] = await Promise.all([
    prisma.product.count(),

    prisma.product.count({
      where: {
        isActive: true,
      },
    }),

    prisma.order.count(),

    prisma.order.count({
      where: {
        status: "COMPLETED",
      },
    }),

    prisma.order.count({
      where: {
        status: "CANCELLED",
      },
    }),

    prisma.order.aggregate({
      where: {
        status: "COMPLETED",
      },
      _sum: {
        totalAmount: true,
      },
    }),

    prisma.product.count({
      where: {
        quantity: {
          lte: 10,
        },
        isActive: true,
      },
    }),

    prisma.order.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    }),
  ]);

  return {
    totalProducts,
    activeProducts,
    totalOrders,
    completedOrders,
    cancelledOrders,
    totalRevenue: revenue._sum.totalAmount || 0,
    lowStockProducts,
    recentOrders,
  };
};
