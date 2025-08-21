import express from "express";
import multer from "multer";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../../controller/shop/shoeCategoryController";
import { storage } from "../../middleware/multerUpload"; // your custom storage

const router = express.Router();
const upload = multer({ storage });

// Create a category with photo
router.post("/", upload.single("photo"), createCategory);

// Get all categories
router.get("/", getAllCategories);

// Get a single category by ID
router.get("/:id", getCategoryById);

// Update a category (optionally change photo)
router.put("/:id", upload.single("photo"), updateCategory);

// Delete a category
router.delete("/:id", deleteCategory);

export default router;
