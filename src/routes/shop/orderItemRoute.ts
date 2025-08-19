import express, { Router } from "express";
import {
  createOrderItem,
  deleteOrderById,
  getAllOrderItem,
  getSingleOrderItemById,
  updateOrderItem,
} from "../../controller/shop/orderItemController";
import asyncErrorHandler from "../../services/asycnErrorHndler";
import isLoggedIn from "../../middleware/middleware";

const router: Router = express.Router();

router.route("/").post(isLoggedIn, asyncErrorHandler(createOrderItem));
router.route("/:id").delete(isLoggedIn, asyncErrorHandler(deleteOrderById));
router.route("/").get(isLoggedIn, asyncErrorHandler(getAllOrderItem));
router.route("/:id").get(isLoggedIn, asyncErrorHandler(getSingleOrderItemById));
router.route("/:id").patch(isLoggedIn, asyncErrorHandler(updateOrderItem));


export default Router