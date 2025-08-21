import express, { Router } from "express";
import multer from "multer";
import {
  createShoes,
  deleteShoe,
  getALLShoes,
  getSingleShoeById,
  updateShoe,
} from "../../controller/shop/shoeController";
import asyncErrorHandler from "../../services/asycnErrorHndler";
import isLoggedIn from "../../middleware/middleware";
import { storage } from "../../middleware/multerUpload"; // your custom storage

const router: Router = express.Router();
const upload = multer({ storage });

// Create shoes with multiple photos
router.route("/").post(
  isLoggedIn,
  upload.array("photos", 5), // max 5 photos, field name 'photos'
  asyncErrorHandler(createShoes)
);

router.route("/:id").delete(isLoggedIn, asyncErrorHandler(deleteShoe));
router.route("/:id").get(isLoggedIn, asyncErrorHandler(getSingleShoeById));
router.route("/").get(isLoggedIn, asyncErrorHandler(getALLShoes));
router.route("/:id").patch(isLoggedIn, asyncErrorHandler(updateShoe));

export default router;
