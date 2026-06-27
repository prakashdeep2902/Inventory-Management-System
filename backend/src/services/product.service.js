import prisma from "../config/prisma.js";

export const createProductService = async (productData) => {
  const { name, sku, description, price, quantity, isActive } = productData;

  // Check for duplicate SKU
  const existingProduct = await prisma.product.findUnique({
    where: {
      sku,
    },
  });

  if (existingProduct) {
    const error = new Error("Product with this SKU already exists.");
    error.statusCode = 409;
    throw error;
  }

  // Create product
  const product = await prisma.product.create({
    data: {
      name: name.trim(),
      sku: sku.trim(),
      description: description?.trim() || null,
      price: Number(price),
      quantity: Number(quantity),
    },
  });

  return product;
};

export const getAllProductsService = async () => {
  console.log("ajsbdkja");
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  console.log("products:::==>", products);
  return products;
};

export const getProductByIdService = async (id) => {
  const product = await prisma.product.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!product) {
    const error = new Error("Product not found.");
    error.statusCode = 404;
    throw error;
  }

  return product;
};

export const updateProductService = async (id, productData) => {
  const { name, sku, description, price, quantity } = productData;

  const product = await prisma.product.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!product) {
    const error = new Error("Product not found.");
    error.statusCode = 404;
    throw error;
  }

  // Check duplicate SKU
  if (sku) {
    const existingSku = await prisma.product.findFirst({
      where: {
        sku,
        NOT: {
          id: Number(id),
        },
      },
    });

    if (existingSku) {
      const error = new Error("Product with this SKU already exists.");
      error.statusCode = 409;
      throw error;
    }
  }

  const updatedProduct = await prisma.product.update({
    where: {
      id: Number(id),
    },
    data: {
      name: name ?? product.name,
      sku: sku ?? product.sku,
      description:
        description !== undefined ? description : product.description,
      price: price !== undefined ? Number(price) : product.price,
      quantity: quantity !== undefined ? Number(quantity) : product.quantity,
    },
  });

  return updatedProduct;
};

export const deleteProductService = async (id) => {
  const product = await prisma.product.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!product) {
    const error = new Error("Product not found.");
    error.statusCode = 404;
    throw error;
  }

  await prisma.product.delete({
    where: {
      id: Number(id),
    },
  });

  return {
    message: "Product deleted successfully.",
  };
};
