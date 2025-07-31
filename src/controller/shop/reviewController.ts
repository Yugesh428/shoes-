import { IExtendedRequest } from "../../middleware/type";
import Review from "../../database/models/reviewModel";
import { Response } from "express";

const getAllReview = async function (req: IExtendedRequest, res: Response) {
  try {
    const allReviews = await Review.findAll();

    res.status(200).json({
      message: "All reviews fetched successfully",
      reviews: allReviews,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Cannot fetch all reviews",
    });
  }
};

const createReview = async function (req: IExtendedRequest, res: Response) {
  try {
    const { userId, shoeId, rating, comment } = req.body;

    // Validation
    if (!userId || !shoeId || !rating || !comment) {
      return res.status(400).json({
        message: "Some required fields are missing",
      });
    }

    // Create the review
    const newReview = await Review.create({
      userId,
      shoeId,
      rating,
      comment,
    });

    // Success response
    res.status(201).json({
      message: "Review created successfully",
      review: newReview,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error creating review",
    });
  }
};

const getReviewById = async function (req: IExtendedRequest, res: Response) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "Review ID is required",
      });
    }

    const existingReview = await Review.findByPk(id);

    if (!existingReview) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    // Success: send review data
    res.status(200).json({
      message: "Review fetched successfully",
      review: existingReview,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error getting review",
    });
  }
};

const updateReview = async function (req: IExtendedRequest, res: Response) {
  try {
    const { id } = req.params;
    const { userId, rating, comment } = req.body;

    if (!id) {
      return res.status(400).json({
        message: "Review ID is required",
      });
    }

    const existingReview = await Review.findByPk(id);

    if (!existingReview) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    // Validate required fields if needed
    if (!userId || !rating || !comment) {
      return res.status(400).json({
        message: "Missing fields for update",
      });
    }

    await existingReview.update({
      userId,
      rating,
      comment,
    });

    res.status(200).json({
      message: "Review updated successfully",
      review: existingReview,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error updating Review",
    });
  }
};

const deleteReviewById = async function (req: IExtendedRequest, res: Response) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        message: "Review ID is required",
      });
    }

    const existingReview = await Review.findByPk(id);

    if (!existingReview) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    await existingReview.destroy();

    res.status(200).json({
      message: "Review deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error deleting Review",
    });
  }
};

export {
  createReview,
  getAllReview,
  getReviewById,
  updateReview,
  deleteReviewById,
};
