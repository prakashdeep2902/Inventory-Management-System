import express from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProductById,
  updateProduct,
} from "../controllers/product.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { validateCreateProduct } from "../validations/product.validation.js";
import { getAllProductsService } from "../services/product.service.js";

const router = express.Router();

router.post("/", authenticate, validateCreateProduct, createProduct);

router.get("/", authenticate, getAllProductsService);

router.get("/:id", authenticate, getProductById);

router.put("/:id", authenticate, updateProduct);

router.delete("/:id", authenticate, deleteProduct);

export default router;
