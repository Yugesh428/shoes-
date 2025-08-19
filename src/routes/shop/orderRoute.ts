import express, { Router } from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getSingleOrderById,
  updateOrder,
} from "../../controller/shop/orderController";
import asyncErrorHandler from "../../services/asycnErrorHndler";
import isLoggedIn from "../../middleware/middleware";

const router: Router = express.Router();

router.route("/").post(isLoggedIn, asyncErrorHandler(createOrder));
router.route("/:id").delete(isLoggedIn, asyncErrorHandler(deleteOrder));
router.route("/").get(isLoggedIn, asyncErrorHandler(getAllOrders));
router.route("/:id").get(isLoggedIn, asyncErrorHandler(getSingleOrderById));
router.route("/:id").put(isLoggedIn, asyncErrorHandler(updateOrder));
router.route("/:id").patch(isLoggedIn, asyncErrorHandler(updateOrder));


export default Router