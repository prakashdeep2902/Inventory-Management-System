import prisma from "../config/prisma.js";

export const stockInService = async (stockData) => {
  const { productId, quantity, note } = stockData;

  // Check if product exists
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

  // Transaction
  const result = await prisma.$transaction(async (tx) => {
    // Update product quantity
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

    // Create stock history
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
