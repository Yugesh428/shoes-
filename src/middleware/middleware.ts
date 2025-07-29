import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../database/models/userModel";
import { IExtendedRequest } from "./type";

const isLoggedIn = async (
  req: IExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(404).json({
      message: "Please Provide Token",
    });
    return;
  }

  jwt.verify(token, "thisissecret", async (error: any, result: any) => {
    if (error) {
      res.status(403).json({
        message: "Token Invalid",
      });
    } else {
      const userData = await User.findByPk(result.id, {
        attributes: ["id"],
      });

      if (!userData) {
        res.status(403).json({
          message: "No user with that id, Invalid token",
        });
      } else {
        req.user = userData;
        next();
      }
    }
  });
};

export default isLoggedIn;
