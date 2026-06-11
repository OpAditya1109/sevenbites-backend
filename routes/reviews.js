const express = require('express');
const router = express.Router();
const { addReview, getReviewsByRestaurant } = require('../controllers/reviewController');
const { protect } = require('../middleware/auth');

router.post('/', protect, addReview);
router.get('/:restaurantId', getReviewsByRestaurant);

module.exports = router;
