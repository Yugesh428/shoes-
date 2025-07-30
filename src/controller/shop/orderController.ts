import order from "../../database/models/orderModel";
import sequelize from "../../Database/connection";
import { IExtendedRequest } from "../../middleware/type";
import { Response } from "express"; // Missing import

const getAllOrders = async function (req: IExtendedRequest, res: Response) {
  try {
    const orders = await order.findAll();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { getAllOrders };
