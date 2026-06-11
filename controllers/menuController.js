const MenuItem = require('../models/MenuItem');

// @route  GET /api/menu/:restaurantId
const getMenuByRestaurant = async (req, res) => {
  try {
    const items = await MenuItem.find({
      restaurantId: req.params.restaurantId,
      isAvailable: true,
    }).sort({ isBestseller: -1, category: 1 });

    // Group by category
    const grouped = items.reduce((acc, item) => {
      const cat = item.category || 'Others';
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(item);
      return acc;
    }, {});

    res.json({
      success: true,
      data: items,
      grouped,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getMenuByRestaurant };
