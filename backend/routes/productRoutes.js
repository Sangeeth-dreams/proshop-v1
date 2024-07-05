import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductsById,
  createProduct,
  updateProduct,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/:id").get(getProductsById).put(protect, admin, updateProduct);

export default router;
