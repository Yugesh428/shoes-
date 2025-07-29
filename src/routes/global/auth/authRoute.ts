import express, { Router } from "express";
import {
  registerUser,
  loginUser,
} from "../../../controller/globals/auth/authController";
import asyncErrorHandler from "../../../services/asycnErrorHndler";

const router: Router = express.Router();

router.route("/register").post(asyncErrorHandler(registerUser));
router.route("/login").post(asyncErrorHandler(loginUser));

export default router;
