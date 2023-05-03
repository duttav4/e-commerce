import express from "express";
import { isAdmin, protectedRoute } from "../middlewares/authMiddlewaare.js";
import { categoryController, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from "../controllers/CategoryController.js";

const router = express.Router();

// routes
router.post('/create-category', protectedRoute ,isAdmin, createCategoryController)

router.put("/update-category/:id", protectedRoute, isAdmin, updateCategoryController)

router.get("/getall-categories", categoryController)

router.get('/single-category/:slug', singleCategoryController)

router.delete('/delete-category/:id', protectedRoute, isAdmin, deleteCategoryController)

export default router 