import express from "express";

import { authenticate } from "../middleware/auth.middleware.js";
import { validateStockIn } from "../validations/stock.validation.js";
import { stockIn } from "../controllers/stock.controller.js";

const router = express.Router();

// Protect all stock routes
router.use(authenticate);

// Stock In
router.post("/in", validateStockIn, stockIn);

export default router;
