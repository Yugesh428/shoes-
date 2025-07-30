import Shoes from "../../database/models/shoesModel";
import { IExtendedRequest } from "../../middleware/type";
import { Response } from "express";

const getALLShoes = async function (req: IExtendedRequest, res: Response) {
  try {
    const allShoes = await Shoes.findAll();
    res.status(200).json(allShoes);
  } catch (error) {
    console.error("Error fetching shoes:", error);
    res.status(500).json({ message: "Failed to fetch shoes" });
  }
};

const createShoes = async function (req: IExtendedRequest, res: Response) {
  try {
    const { id, name, brand, image, stock, category } = req.body;

    const newShoe = await Shoes.create({
      id,
      name,
      brand,
      image,
      stock,
      category,
    });

    res.status(201).json({
      message: "Shoe created successfully",
      shoe: newShoe,
    });
  } catch (error) {
    console.error("Error creating shoe:", error);
    res.status(500).json({
      message: "Error creating shoe",
    });
  }
};

const getSingleShoeById = async function (
  req: IExtendedRequest,
  res: Response
) {
  try {
    const { id } = req.params;

    const singleShoe = await Shoes.findByPk(id);

    if (!singleShoe) {
      return res.status(404).json({
        message: "Shoe not found",
      });
    }

    // ✅ Success response
    return res.status(200).json({
      message: "Shoe retrieved successfully",
      shoe: singleShoe,
    });
  } catch (error) {
    console.error("Error fetching shoe:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const updateShoe = async function (req: IExtendedRequest, res: Response) {
  try {
    const { id } = req.params;
    const { name, brand, image, stock, category } = req.body;

    const existingShoe = await Shoes.findByPk(id);

    if (!existingShoe) {
      return res.status(404).json({ message: "Shoe not found" });
    }

    await existingShoe.update({
      name,
      brand,
      image,
      stock,
      category,
    });

    return res.status(200).json({
      message: "Shoe updated successfully",
      shoe: existingShoe,
    });
  } catch (error) {
    console.error("Error updating shoe:", error);
    res.status(500).json({
      message: "Unable to update shoe",
    });
  }
};

const deleteShoe = async function (req: IExtendedRequest, res: Response) {
  try {
    const { id } = req.params;

    const existingShoe = await Shoes.findByPk(id);

    if (!existingShoe) {
      return res.status(404).json({ message: "Shoe not found" });
    }

    await existingShoe.destroy();

    return res.status(200).json({
      message: "Shoe deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting shoe:", error);
    res.status(500).json({
      message: "Unable to delete shoe",
    });
  }
};

export { getALLShoes, createShoes, getSingleShoeById, updateShoe, deleteShoe };
