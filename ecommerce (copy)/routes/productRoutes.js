import express from "express";
import { isAdmin, protectedRoute } from "../middlewares/authMiddlewaare.js";
import { createProductController, deleteProductController, getProductController, getSingleProductController, productPhotoCOntroller, updateProductController } from "../controllers/ProductController.js";
import formidable from "express-formidable";

const router = express.Router();

router.post('/create-product', protectedRoute, isAdmin, formidable(),createProductController)

router.put('/update-product/:pid', protectedRoute, isAdmin, formidable(),updateProductController)


router.get('/get-product', getProductController)

router.get('/get-product/:slug', getSingleProductController)

router.get("/get-product-photo/:pid", productPhotoCOntroller)

router.delete("/delete-product/:pid", deleteProductController)


export default router