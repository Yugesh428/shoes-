import { Response } from "express";
import { IExtendedRequest } from "../../middleware/type";
import OrderItem from "../../database/models/oderItemModel";
import { Sequelize } from "sequelize";

const getAllOrderItem = async function (req: IExtendedRequest, res: Response) {
  try {
    const allItems = await OrderItem.findAll();

    res.status(200).json({
      message: "All order items fetched successfully",
      items: allItems,
    });
  } catch (error) {
    console.error("Error fetching order items:", error);
    res.status(500).json({
      error: "Cannot fetch all items",
    });
  }
};

const createOrderItem = async function (req: IExtendedRequest, res: Response) {
  try {
    const { id, orderId, shoeId, quantity, price } = req.body;

    // Basic validation
    if (!orderId || !shoeId || !quantity || !price) {
      return res.status(400).json({
        message: "Missing required fields: orderId, shoeId, quantity, or price",
      });
    }

    // Create new order item
    const newOrderItem = await OrderItem.create({
      id, // optional, if you want to supply id; else omit and let UUID auto-generate
      orderId,
      shoeId,
      quantity,
      price,
    });

    res.status(201).json({
      message: "Order item created successfully",
      orderItem: newOrderItem,
    });
  } catch (error) {
    console.error("Error creating order item:", error);
    res.status(500).json({
      message: "Unable to create order item",
    });
  }
};
