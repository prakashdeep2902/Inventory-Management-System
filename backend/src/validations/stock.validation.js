export const validateStock = (req, res, next) => {
  const { productId, quantity } = req.body;

  if (!productId || quantity === undefined) {
    return res.status(400).json({
      success: false,
      message: "Product ID and quantity are required.",
    });
  }

  if (!Number.isInteger(Number(productId)) || Number(productId) <= 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid product ID.",
    });
  }

  if (!Number.isInteger(Number(quantity)) || Number(quantity) <= 0) {
    return res.status(400).json({
      success: false,
      message: "Quantity must be a positive integer.",
    });
  }

  next();
};
