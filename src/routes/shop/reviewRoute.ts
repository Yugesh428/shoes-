import express, { Router } from "express";
import {
  createReview,
  deleteReviewById,
  getAllReview,
  getReviewById,
  updateReview,
} from "../../controller/shop/reviewController";
import asyncErrorHandler from "../../services/asycnErrorHndler";
import isLoggedIn from "../../middleware/middleware";

const router: Router = express.Router();

router.route("/").post(isLoggedIn, asyncErrorHandler(createReview));
router.route("/:id").delete(isLoggedIn, asyncErrorHandler(deleteReviewById));
router.route("/:id").get(isLoggedIn, asyncErrorHandler(getReviewById));
router.route("/:id").patch(isLoggedIn, asyncErrorHandler(updateReview));
router.route("/").get(isLoggedIn, asyncErrorHandler(getAllReview));

export default Router;
