export const validateCreateOrder = (req, res, next) => {
  const { items } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Order must contain at least one item.",
    });
  }

  for (const item of items) {
    if (!item.productId || !item.quantity) {
      return res.status(400).json({
        success: false,
        message: "Product ID and quantity are required.",
      });
    }

    if (
      !Number.isInteger(Number(item.productId)) ||
      Number(item.productId) <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID.",
      });
    }

    if (
      !Number.isInteger(Number(item.quantity)) ||
      Number(item.quantity) <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be greater than zero.",
      });
    }
  }

  next();
};
