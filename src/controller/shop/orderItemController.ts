import { Response } from "express";
import { IExtendedRequest } from "../../middleware/type";
import OrderItem from "../../database/models/oderItemModel";
import sendMail from "../../middleware/sendMail";
import Shoe from "../../database/models/shoesModel";
import Order from "../../database/models/orderModel";
import User from "../../database/models/userModel";
import Address from "../../database/models/addressModel";
import sequelize from "../../database/connection";

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
  const t = await sequelize.transaction();
  try {
    const { id, orderId, shoeId, quantity, price } = req.body;

    if (!orderId || !shoeId || !quantity || !price) {
      await t.rollback();
      return res.status(400).json({
        message: "Missing required fields: orderId, shoeId, quantity, or price",
      });
    }

    // Lock shoe row to prevent race condition
    const shoe = await Shoe.findByPk(shoeId, {
      transaction: t,
      lock: t.LOCK.UPDATE,
    });
    if (!shoe) {
      await t.rollback();
      return res.status(404).json({ message: "Shoe not found" });
    }

    // Create order item inside transaction
    const newOrderItem = await OrderItem.create(
      { id, orderId, shoeId, quantity, price },
      { transaction: t }
    );

    const order = await Order.findByPk(orderId, { transaction: t });
    const user = await User.findByPk(order?.userId, { transaction: t });
    const address = await Address.findOne({
      where: { userId: user?.id },
      transaction: t,
    });

    const total = (price * quantity).toFixed(2);

    if (user && shoe) {
      const customerMail = {
        to: user.email,
        subject: "🛍️ Your ShoeVerse Order Confirmation",
        html: `
          <h2>Hello ${user.username},</h2>
          <p>Thanks for your order!</p>
          <p><strong>Shoe:</strong> ${shoe.name}</p>
          <p><strong>Quantity:</strong> ${quantity}</p>
          <p><strong>Total:</strong> $${total}</p>
        `,
        text: `Order confirmed. Shoe: ${shoe.name}, Qty: ${quantity}, Total: $${total}`,
      };
      await sendMail(customerMail);

      const shopMail = {
        to: "bastolayugesh2@gmail.com",
        subject: "📦 New Order Notification",
        html: `
          <h2>New Order Received</h2>
          <p><strong>Customer:</strong> ${user.username} (${user.email})</p>
          <p><strong>Address:</strong> ${
            address
              ? `${address.street}, ${address.city}, ${address.state}, ${address.country}, ${address.postalCode}`
              : "No address provided"
          }</p>
          <p><strong>Shoe:</strong> ${shoe.name}</p>
          <p><strong>Quantity:</strong> ${quantity}</p>
          <p><strong>Total:</strong> $${total}</p>
        `,
        text: `New order from ${user.username}. Address: ${
          address
            ? `${address.street}, ${address.city}, ${address.state}, ${address.country}, ${address.postalCode}`
            : "No address provided"
        }. Shoe: ${shoe.name}, Qty: ${quantity}, Total: $${total}`,
      };
      await sendMail(shopMail);
    }

    await t.commit();
    res.status(201).json({
      message: "Order item created and emails sent successfully",
      orderItem: newOrderItem,
    });
  } catch (error) {
    await t.rollback();
    console.error("Error creating order item:", error);
    res.status(500).json({
      message: "Unable to create order item",
    });
  }
};

const updateOrderItem = async function (req: IExtendedRequest, res: Response) {
  const t = await sequelize.transaction();
  try {
    const { id } = req.params;
    const { orderId, shoeId, quantity, price } = req.body;

    if (!orderId || !shoeId || !quantity || !price) {
      await t.rollback();
      return res.status(400).json({
        message: "Some fields are missing",
      });
    }

    const existingOrderItem = await OrderItem.findByPk(id, { transaction: t });
    if (!existingOrderItem) {
      await t.rollback();
      return res.status(404).json({
        message: "Order item not found",
      });
    }

    // Lock shoe row to prevent race condition
    const shoe = await Shoe.findByPk(shoeId, {
      transaction: t,
      lock: t.LOCK.UPDATE,
    });
    if (!shoe) {
      await t.rollback();
      return res.status(404).json({ message: "Shoe not found" });
    }

    await existingOrderItem.update(
      { orderId, shoeId, quantity, price },
      { transaction: t }
    );

    await t.commit();
    res.status(200).json({
      message: "Order item updated successfully",
      updatedItem: existingOrderItem,
    });
  } catch (error) {
    await t.rollback();
    console.error(error);
    res.status(500).json({
      message: "Unable to update item",
    });
  }
};

const getSingleOrderItemById = async function (
  req: IExtendedRequest,
  res: Response
) {
  try {
    const { id } = req.params;
    const singleOrder = await OrderItem.findByPk(id);

    if (!singleOrder) {
      return res.status(404).json({ message: "Order item not found" });
    }

    res.status(200).json({
      message: "Item fetched successfully",
      orderItem: singleOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch item" });
  }
};

const deleteOrderById = async function (req: IExtendedRequest, res: Response) {
  try {
    const { id } = req.params;
    const singleOrder = await OrderItem.findByPk(id);

    if (!singleOrder) {
      return res.status(404).json({ message: "Order item not found" });
    }

    await singleOrder.destroy();
    res.status(200).json({ message: "Order item deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete order item" });
  }
};

export {
  createOrderItem,
  getAllOrderItem,
  getSingleOrderItemById,
  updateOrderItem,
  deleteOrderById,
};
