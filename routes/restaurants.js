const express = require('express');
const router = express.Router();
const { getRestaurants, searchRestaurants, getRestaurantById } = require('../controllers/restaurantController');

// IMPORTANT: /search must be before /:id — otherwise Express matches "search" as an ID
router.get('/search', searchRestaurants);
router.get('/', getRestaurants);
router.get('/:id', getRestaurantById);

module.exports = router;
