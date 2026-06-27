import { stockInService } from "../services/stock.service.js";

export const stockIn = async (req, res) => {
  try {
    const product = await stockInService(req.body);

    return res.status(200).json({
      success: true,
      message: "Stock added successfully.",
      data: product,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
