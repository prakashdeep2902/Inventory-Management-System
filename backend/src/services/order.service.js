import prisma from "../config/prisma.js";

export const createOrderService = async (userId, items) => {
  return await prisma.$transaction(async (tx) => {
    let totalAmount = 0;

    const orderItems = [];

    for (const item of items) {
      const product = await tx.product.findUnique({
        where: {
          id: Number(item.productId),
        },
      });

      if (!product || !product.isActive) {
        const error = new Error("Product not found.");
        error.statusCode = 404;
        throw error;
      }

      if (product.quantity < item.quantity) {
        const error = new Error(`${product.name} has insufficient stock.`);
        error.statusCode = 400;
        throw error;
      }

      const unitPrice = Number(product.price);
      const subtotal = unitPrice * Number(item.quantity);

      totalAmount += subtotal;

      orderItems.push({
        productId: product.id,
        quantity: Number(item.quantity),
        unitPrice,
        subtotal,
      });
    }

    const order = await tx.order.create({
      data: {
        userId,
        totalAmount,
      },
    });

    for (const item of orderItems) {
      await tx.orderItem.create({
        data: {
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          subtotal: item.subtotal,
        },
      });

      await tx.product.update({
        where: {
          id: item.productId,
        },
        data: {
          quantity: {
            decrement: item.quantity,
          },
        },
      });

      await tx.stockHistory.create({
        data: {
          productId: item.productId,
          action: "ORDER",
          quantity: item.quantity,
          note: `Order #${order.id}`,
        },
      });
    }

    return await tx.order.findUnique({
      where: {
        id: order.id,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  });
};

export const getAllOrdersService = async () => {
  const orders = await prisma.order.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
      items: {
        include: {
          product: {
            select: {
              id: true,
              name: true,
              sku: true,
              price: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return orders;
};

export const getOrderByIdService = async (id) => {
  const order = await prisma.order.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!order) {
    const error = new Error("Order not found.");
    error.statusCode = 404;
    throw error;
  }

  return order;
};

export const cancelOrderService = async (orderId) => {
  return await prisma.$transaction(async (tx) => {
    const order = await tx.order.findUnique({
      where: {
        id: Number(orderId),
      },
      include: {
        items: true,
      },
    });

    if (!order) {
      const error = new Error("Order not found.");
      error.statusCode = 404;
      throw error;
    }

    if (order.status === "CANCELLED") {
      const error = new Error("Order is already cancelled.");
      error.statusCode = 400;
      throw error;
    }

    // Restore stock & create stock history
    for (const item of order.items) {
      await tx.product.update({
        where: {
          id: item.productId,
        },
        data: {
          quantity: {
            increment: item.quantity,
          },
        },
      });

      await tx.stockHistory.create({
        data: {
          productId: item.productId,
          action: "CANCEL",
          quantity: item.quantity,
          note: `Cancelled Order #${order.id}`,
        },
      });
    }

    // Update order status
    const updatedOrder = await tx.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: "CANCELLED",
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return updatedOrder;
  });
};
