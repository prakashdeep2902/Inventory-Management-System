import {
  getProductStockHistoryService,
  getStockHistoryService,
  stockInService,
  stockOutServices,
} from "../services/stock.service.js";

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

export const stockOut = async (req, res) => {
  try {
    const product = await stockOutServices(req.body);
    return res.status(200).json({
      success: true,
      message: "Stock removed successfully.",
      data: product,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const getStockHistory = async (req, res) => {
  try {
    const history = await getStockHistoryService();

    return res.status(200).json({
      success: true,
      message: "Stock history fetched successfully.",
      data: history,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const getProductStockHistory = async (req, res) => {
  try {
    const history = await getProductStockHistoryService(req.params.productId);

    return res.status(200).json({
      success: true,
      message: "Product stock history fetched successfully.",
      data: history,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
