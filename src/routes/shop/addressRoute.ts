import express, { Router } from "express";
import {
  addOrUpdateAddress,
  deleteAddress,
  getAddressByUser,
} from "../../controller/shop/addressController";
import asyncErrorHandler from "../../services/asycnErrorHndler";
import isLoggedIn from "../../middleware/middleware";

const router: Router = express.Router();

router.route("/").post(isLoggedIn, asyncErrorHandler(addOrUpdateAddress));
router.route("/:id").delete(isLoggedIn, asyncErrorHandler(deleteAddress));
router.route("/:id").get(isLoggedIn, asyncErrorHandler(getAddressByUser));

export default Router;
