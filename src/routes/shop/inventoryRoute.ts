import express, { Router } from "express";
import {
  addorUpdateStock,
  deleteStock,
  getAllStock,
  getStockById,
} from "../../controller/shop/inventoryController";
import asyncErrorHandler from "../../services/asycnErrorHndler";
import isLoggedIn from "../../middleware/middleware";

const router: Router = express.Router();

router.route("/").post(isLoggedIn, asyncErrorHandler(addorUpdateStock));
router.route("/:id").delete(isLoggedIn, asyncErrorHandler(deleteStock));
router.route("/").get(isLoggedIn, asyncErrorHandler(getAllStock));
router.route("/:id").get(isLoggedIn, asyncErrorHandler(getStockById));


export default Router