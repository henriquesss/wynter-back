import express from "express";

import {
	getAllProducts,
	createProduct,
	editProduct,
	deleteProduct,
	searchProducts,
	getProduct,
	getProductDetail,
} from "../controllers/productController.js";

import { isAdmin } from "../middleware/access.js"

const router = express.Router();

// Get all products
router.get("/", getAllProducts);

// Create a new product
router.post("/:productId", createProduct);

router.put("/:productId", editProduct)

// Delete a product
router.delete("/", deleteProduct);

// search a product
router.get("/search", searchProducts);

// Get a product by ID
router.get("/:productId", getProduct);

// Get product detail
router.get("/detail/:productId", getProductDetail);

export default router;
