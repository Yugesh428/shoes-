import express, { Router } from "express";
import {
  createShoes,
  deleteShoe,
  getALLShoes,
  getSingleShoeById,
  updateShoe,
} from "../../controller/shop/shoeController";
import asyncErrorHandler from "../../services/asycnErrorHndler";
import isLoggedIn from "../../middleware/middleware";

const router: Router = express.Router();

router.route("/").post(isLoggedIn, asyncErrorHandler(createShoes));
router.route("/:id").delete(isLoggedIn, asyncErrorHandler(deleteShoe));
router.route("/:id").get(isLoggedIn, asyncErrorHandler(getSingleShoeById));
router.route("/").get(isLoggedIn, asyncErrorHandler(getALLShoes));
router.route("/:id").patch(isLoggedIn, asyncErrorHandler(updateShoe));


export default Router