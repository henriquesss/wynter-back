import express from "express";

import {
	getAllProducts,
	createProduct,
	deleteProduct,
	searchProducts,
	getProduct,
	getProductDetail,
} from "../controllers/productController.js";

const router = express.Router();

// Get all products
router.get("/", getAllProducts);

// Create a new product
router.post("/", createProduct);

// Delete a product
router.delete("/", deleteProduct);

// search a product
router.get("/search", searchProducts);

// Get a product by ID
router.get("/:productId", getProduct);

// Get product detail
router.get("/detail/:productId", getProductDetail);

export default router;
