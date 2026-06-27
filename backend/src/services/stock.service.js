import { Prisma } from "@prisma/client";
import prisma from "../config/prisma.js";

export const stockInService = async (stockData) => {
  const { productId, quantity, note } = stockData;

  const product = await prisma.product.findUnique({
    where: {
      id: Number(productId),
    },
  });

  if (!product) {
    const error = new Error("Product not found.");
    error.statusCode = 404;
    throw error;
  }

  const result = await prisma.$transaction(async (tx) => {
    const updatedProduct = await tx.product.update({
      where: {
        id: Number(productId),
      },
      data: {
        quantity: {
          increment: Number(quantity),
        },
      },
    });

    await tx.stockHistory.create({
      data: {
        productId: Number(productId),
        action: "ADD",
        quantity: Number(quantity),
        note: note || null,
      },
    });

    return updatedProduct;
  });

  return result;
};

export const stockOutServices = async (stockData) => {
  const { productId, quantity, note } = stockData;

  console.log(productId, quantity, note);

  const Product = await prisma.product.findUnique({
    where: { id: Number(productId) },
  });

  if (!Product) {
    const error = new Error("Product not found.");
    error.statusCode = 404;
    throw error;
  }

  if (Product.quantity < Number(quantity)) {
    const error = new Error("Insufficient stock.");
    error.statusCode = 400;
    throw error;
  }

  const result = await prisma.$transaction(async (tx) => {
    const updatedProduct = await tx.product.update({
      where: {
        id: Number(productId),
      },
      data: {
        quantity: {
          decrement: Number(quantity),
        },
      },
    });

    await tx.stockHistory.create({
      data: {
        productId: Number(productId),
        action: "REMOVE",
        quantity: Number(quantity),
        note: note || null,
      },
    });

    return updatedProduct;
  });

  return result;
};

export const getStockHistoryService = async () => {
  return await prisma.stockHistory.findMany({
    include: {
      product: {
        select: {
          id: true,
          name: true,
          sku: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getProductStockHistoryService = async (productId) => {
  const product = await prisma.product.findUnique({
    where: {
      id: Number(productId),
    },
  });

  if (!product) {
    const error = new Error("Product not found.");
    error.statusCode = 404;
    throw error;
  }

  return await prisma.stockHistory.findMany({
    where: {
      productId: Number(productId),
    },
    include: {
      product: {
        select: {
          id: true,
          name: true,
          sku: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};
