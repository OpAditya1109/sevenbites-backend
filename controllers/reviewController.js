const Review = require('../models/Review');

// @route  POST /api/reviews  (protected)
const addReview = async (req, res) => {
  try {
    const { restaurantId, orderId, rating, comment } = req.body;

    if (!restaurantId || !rating) {
      return res.status(400).json({ success: false, message: 'Restaurant ID and rating are required' });
    }

    // Check if already reviewed
    const existing = await Review.findOne({ userId: req.user._id, restaurantId });
    if (existing) {
      // Update existing review
      existing.rating = rating;
      existing.comment = comment;
      if (orderId) existing.orderId = orderId;
      await existing.save();
      return res.json({ success: true, data: existing });
    }

    const review = await Review.create({
      userId: req.user._id,
      restaurantId,
      orderId,
      rating,
      comment,
    });

    res.status(201).json({ success: true, data: review });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route  GET /api/reviews/:restaurantId
const getReviewsByRestaurant = async (req, res) => {
  try {
    const reviews = await Review.find({ restaurantId: req.params.restaurantId })
      .populate('userId', 'name avatar')
      .sort({ createdAt: -1 })
      .limit(50);

    const avgRating =
      reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : 0;

    res.json({
      success: true,
      avgRating: Math.round(avgRating * 10) / 10,
      total: reviews.length,
      data: reviews,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { addReview, getReviewsByRestaurant };
