import { Response } from "express";
import { IExtendedRequest } from "../../middleware/type";
import InventoryStock from "../../database/models/inventoryStockModel";
import Shoe from "../../database/models/shoesModel";
import sendMail from "../../middleware/sendMail";
import { Sequelize } from "sequelize";

// Add or update stock, send mail if stock low
const addorUpdateStock = async function (req: IExtendedRequest, res: Response) {
  try {
    const { shoeId, quantity, reorderLevel } = req.body;

    if (!shoeId || quantity == null) {
      return res.status(400).json({
        message: "Please provide shoeId and quantity",
      });
    }

    const existingStock = await InventoryStock.findOne({ where: { shoeId } });

    if (existingStock) {
      existingStock.quantity = quantity;
      if (reorderLevel != null) existingStock.reorderLevel = reorderLevel;

      await existingStock.save();

      if (
        existingStock.reorderLevel != null &&
        existingStock.quantity <= existingStock.reorderLevel
      ) {
        const shoe = await Shoe.findByPk(shoeId);

        await sendMail({
          to: "shopowner@example.com", // replace with real email
          subject: `⚠️ Low Stock Alert for Shoe: ${shoe?.name || shoeId}`,
          text: `The stock for shoe "${
            shoe?.name || shoeId
          }" is low.\nCurrent quantity: ${
            existingStock.quantity
          }\nReorder level: ${
            existingStock.reorderLevel
          }\nPlease reorder soon.`,
          html: `
            <h2>Low Stock Alert</h2>
            <p>The stock for shoe <strong>${
              shoe?.name || shoeId
            }</strong> is low.</p>
            <p>Current quantity: <strong>${existingStock.quantity}</strong></p>
            <p>Reorder level: <strong>${existingStock.reorderLevel}</strong></p>
            <p>Please reorder soon to avoid stock out.</p>
          `,
        });
      }

      return res.status(200).json({
        message: "Stock updated successfully",
        stock: existingStock,
      });
    } else {
      const newStock = await InventoryStock.create({
        shoeId,
        quantity,
        reorderLevel,
      });

      return res.status(201).json({
        message: "Stock created successfully",
        stock: newStock,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error updating stock",
    });
  }
};

// Get all stock items with shoe details
const getAllStock = async function (req: IExtendedRequest, res: Response) {
  try {
    const stocks = await InventoryStock.findAll({
      include: [{ model: Shoe }],
    });

    res.status(200).json({
      message: "All stock fetched successfully",
      stocks,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error fetching stocks",
    });
  }
};

// Get single stock by id with shoe details
const getStockById = async function (req: IExtendedRequest, res: Response) {
  try {
    const { id } = req.params;
    const stock = await InventoryStock.findByPk(id, {
      include: [{ model: Shoe }],
    });

    if (!stock) {
      return res.status(404).json({
        message: "Stock not found",
      });
    }

    res.status(200).json({
      message: "Stock fetched successfully",
      stock,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error fetching stock",
    });
  }
};

// Delete stock by id
const deleteStock = async function (req: IExtendedRequest, res: Response) {
  try {
    const { id } = req.params;
    const stock = await InventoryStock.findByPk(id);

    if (!stock) {
      return res.status(404).json({
        message: "Stock not found",
      });
    }

    await stock.destroy();

    res.status(200).json({
      message: "Stock deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error deleting stock",
    });
  }
};

export { addorUpdateStock, getAllStock, getStockById, deleteStock };
