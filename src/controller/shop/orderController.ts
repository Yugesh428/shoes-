import order from "../../database/models/orderModel";
import sequelize from "../../database/connection";
import { IExtendedRequest } from "../../middleware/type";
import { Response } from "express";

// Get all orders
const getAllOrders = async function (req: IExtendedRequest, res: Response) {
  try {
    const orders = await order.findAll();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create order
const createOrder = async function (req: IExtendedRequest, res: Response) {
  try {
    const { id, userId, status, total_amount } = req.body;
    const newOrder = await order.create({
      id,
      userId,
      status,
      total_amount,
    });
    res.status(200).json({
      message: "Order Created Successfully",
      order: newOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error Creating Order",
    });
  }
};

// Get single order by ID
const getSingleOrderById = async function (
  req: IExtendedRequest,
  res: Response
) {
  try {
    const { id } = req.params;
    const singleOrder = await order.findByPk(id);
    if (!singleOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({
      message: "Order fetched",
      order: singleOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Failed to get order",
    });
  }
};

// Update order
const updateOrder = async function (req: IExtendedRequest, res: Response) {
  try {
    const { id } = req.params;
    const { userId, status, total_amount } = req.body;

    const existingOrder = await order.findByPk(id);
    if (!existingOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    await existingOrder.update({ userId, status, total_amount });

    res.status(200).json({
      message: "Order updated successfully",
      order: existingOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Failed to update order",
    });
  }
};

// Delete order
const deleteOrder = async function (req: IExtendedRequest, res: Response) {
  try {
    const { id } = req.params;

    const existingOrder = await order.findByPk(id);
    if (!existingOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    await existingOrder.destroy();

    res.status(200).json({
      message: "Order deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Failed to delete order",
    });
  }
};

export {
  getAllOrders,
  createOrder,
  getSingleOrderById,
  updateOrder,
  deleteOrder,
};
