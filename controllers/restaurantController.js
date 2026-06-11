const Restaurant = require('../models/Restaurant');

// @route  GET /api/restaurants
const getRestaurants = async (req, res) => {
  try {
    const { category, isVeg, sort, page = 1, limit = 20 } = req.query;

    const filter = {};
    if (category) filter.category = { $regex: category, $options: 'i' };
    if (isVeg === 'true') filter.isVeg = true;

    let sortOption = { createdAt: -1 };
    if (sort === 'rating') sortOption = { rating: -1 };
    if (sort === 'delivery') sortOption = { deliveryFee: 1 };
    if (sort === 'time') sortOption = { deliveryTime: 1 };

    const skip = (Number(page) - 1) * Number(limit);

    const [restaurants, total] = await Promise.all([
      Restaurant.find(filter).sort(sortOption).skip(skip).limit(Number(limit)),
      Restaurant.countDocuments(filter),
    ]);

    res.json({
      success: true,
      total,
      page: Number(page),
      data: restaurants,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route  GET /api/restaurants/search?q=query
const searchRestaurants = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || q.trim() === '') {
      return res.json({ success: true, data: [] });
    }

    const restaurants = await Restaurant.find({
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { cuisine: { $elemMatch: { $regex: q, $options: 'i' } } },
        { category: { $regex: q, $options: 'i' } },
        { tags: { $elemMatch: { $regex: q, $options: 'i' } } },
      ],
    }).limit(20);

    res.json({ success: true, data: restaurants });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route  GET /api/restaurants/:id
const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ success: false, message: 'Restaurant not found' });
    }
    res.json({ success: true, data: restaurant });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getRestaurants, searchRestaurants, getRestaurantById };
