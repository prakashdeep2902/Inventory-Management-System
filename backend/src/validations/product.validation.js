export const validateCreateProduct = (req, res, next) => {
  const { name, sku, price, quantity } = req.body;

  // Required fields
  if (!name || !sku || price === undefined || quantity === undefined) {
    return res.status(400).json({
      success: false,
      message: "Name, SKU, Price and Quantity are required.",
    });
  }

  // Name validation
  if (typeof name !== "string" || name.trim().length < 2) {
    return res.status(400).json({
      success: false,
      message: "Product name must be at least 2 characters.",
    });
  }

  // SKU validation
  if (typeof sku !== "string" || sku.trim().length < 2) {
    return res.status(400).json({
      success: false,
      message: "SKU is invalid.",
    });
  }

  // Price validation
  if (isNaN(price) || Number(price) < 0) {
    return res.status(400).json({
      success: false,
      message: "Price must be a valid positive number.",
    });
  }

  // Quantity validation
  if (!Number.isInteger(Number(quantity)) || Number(quantity) < 0) {
    return res.status(400).json({
      success: false,
      message: "Quantity must be a positive integer.",
    });
  }

  next();
};
