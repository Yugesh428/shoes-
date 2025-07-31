import { Response } from "express";
import { IExtendedRequest } from "../../middleware/type";
import OrderItem from "../../database/models/oderItemModel";
import { Sequelize } from "sequelize";
import sequelize from "../../Database/connection";

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

const getSingleOrderItemById = async function (
  req: IExtendedRequest,
  res: Response
) {
  try {
    const { id } = req.params;

    // Fetching the order item by primary key (usually the id)
    const singleOrder = await OrderItem.findByPk(id);

    if (!singleOrder) {
      return res.status(404).json({
        message: "Order item not found",
      });
    }

    res.status(200).json({
      message: "Item fetched successfully",
      orderItem: singleOrder, // Use key:value properly
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch item",
    });
  }
};

const deleteOrderById = async function (req: IExtendedRequest, res: Response) {
  try {
    const { id } = req.params;

    const singleOrder = await OrderItem.findByPk(id);

    if (!singleOrder) {
      return res.status(404).json({
        message: "Order item not found",
      });
    }

    await singleOrder.destroy(); // Deletes the found record

    res.status(200).json({
      message: "Order item deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to delete order item",
    });
  }
};

const updateOrderItem = async function (req: IExtendedRequest, res: Response) {
  try {
    const { id } = req.params;
    const { orderId, shoeId, quantity, price } = req.body;

    // Check for missing fields
    if (!orderId || !shoeId || !quantity || !price) {
      return res.status(400).json({
        message: "Some fields are missing",
      });
    }

    // Find existing item
    const existingOrderItem = await OrderItem.findByPk(id);

    if (!existingOrderItem) {
      return res.status(404).json({
        message: "Order item not found",
      });
    }

    // Update fields using `.update()`
    await existingOrderItem.update({
      orderId,
      shoeId,
      quantity,
      price,
    });

    res.status(200).json({
      message: "Order item updated successfully",
      updatedItem: existingOrderItem,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Unable to update item",
    });
  }
};

export {
  createOrderItem,
  getAllOrderItem,
  getSingleOrderItemById,
  updateOrderItem,
  deleteOrderById,
};
