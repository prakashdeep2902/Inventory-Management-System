import express from "express";

import {
  cancelOrder,
  createOrder,
  getAllOrders,
  getOrderById,
} from "../controllers/order.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";
import { validateCreateOrder } from "../validations/order.validation.js";

const router = express.Router();

// Protect all order routes
router.use(authenticate);

// Create Order
router.post("/", validateCreateOrder, createOrder);
router.get("/", getAllOrders);
router.get("/:id", getOrderById);
router.patch("/:id/cancel", cancelOrder);

export default router;
