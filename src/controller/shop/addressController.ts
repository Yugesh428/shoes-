import { Response } from "express";
import { IExtendedRequest } from "../../middleware/type";
import Address from "../../database/models/addressModel";

// Create or update address for a user
const addOrUpdateAddress = async (req: IExtendedRequest, res: Response) => {
  try {
    const userId = req.user?.id; // assuming user ID comes from auth middleware
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: No user ID" });
    }

    const { street, city, state, country, postalCode } = req.body;

    if (!street || !city || !state || !country || !postalCode) {
      return res
        .status(400)
        .json({ message: "All address fields are required" });
    }

    // Check if address exists for this user
    let address = await Address.findOne({ where: { userId } });

    if (address) {
      // Update existing address
      await address.update({ street, city, state, country, postalCode });
    } else {
      // Create new address
      address = await Address.create({
        userId,
        street,
        city,
        state,
        country,
        postalCode,
      });
    }

    res.status(200).json({
      message: "Address saved successfully",
      address,
    });
  } catch (error) {
    console.error("Error saving address:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get address by user ID
const getAddressByUser = async (req: IExtendedRequest, res: Response) => {
  try {
    const userId = req.params.userId || req.user?.id;
    if (!userId) {
      return res.status(400).json({ message: "User ID required" });
    }

    const address = await Address.findOne({ where: { userId } });

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    res.status(200).json({
      message: "Address fetched successfully",
      address,
    });
  } catch (error) {
    console.error("Error fetching address:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete address by ID
const deleteAddress = async (req: IExtendedRequest, res: Response) => {
  try {
    const { id } = req.params;

    const address = await Address.findByPk(id);

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    await address.destroy();

    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    console.error("Error deleting address:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { addOrUpdateAddress, getAddressByUser, deleteAddress };
