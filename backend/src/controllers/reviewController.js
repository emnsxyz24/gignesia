import Review from "../models/Review.js";

export const createReview = async (req, res) => {
  try {
    const { orderId, userId, rating, comment } = req.body;
    const newReview = new Review({ orderId, userId, rating, comment });
    await newReview.save();
    res
      .status(201)
      .json({ message: "Review created successfully", review: newReview });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getReviewsByService = async (req, res) => {
  try {
    const { orderId } = req.params;
    const reviews = await Review.find({ service: orderId }).populate(
      "userId",
      "name"
    ).populate({
      path: "orderId",
      populate: {
        path: "service_id",
      },
    });

    res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateReview = async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;

  try {
    const updatedReview = await Review.findByIdAndUpdate(
      id,
      { rating, comment },
      { new: true, runValidators: true }
    );

    if (!updatedReview) {
      return res.status(404).json({ message: "Review not found" });
    }

    res
      .status(200)
      .json({ message: "Review updated successfully", review: updatedReview });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update review", error: error.message });
  }
};

export const deleteReview = async (req, res) => {
  const { id } = req.params;
  console.log(`Received ID for deletion: ${id}`);

  try {
    const deletedReview = await Review.findByIdAndDelete(id);
    if (!deletedReview) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete review", error: error.message });
  }
};
