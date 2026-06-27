import express from "express";

import { authenticate } from "../middleware/auth.middleware.js";
import { validateStock } from "../validations/stock.validation.js";
import {
  getProductStockHistory,
  getStockHistory,
  stockIn,
  stockOut,
} from "../controllers/stock.controller.js";

const router = express.Router();

// Protect all stock routes
router.use(authenticate);

// Stock In
router.post("/in", validateStock, stockIn);
router.post("/out", validateStock, stockOut);

// Get All Stock History
router.get("/history", getStockHistory);

// Get Stock History By Product
router.get("/history/:productId", getProductStockHistory);

export default router;
