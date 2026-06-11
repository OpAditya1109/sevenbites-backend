const express = require('express');
const router = express.Router();
const {
  placeOrder,
  getUserOrders,
  getOrderById,
  cancelOrder,
  updateOrderStatus,
} = require('../controllers/orderController');
const { protect } = require('../middleware/auth');

// IMPORTANT: /my-orders before /:id
router.get('/my-orders', protect, getUserOrders);
router.post('/', protect, placeOrder);
router.get('/:id', protect, getOrderById);
router.put('/:id/cancel', protect, cancelOrder);
router.put('/:id/status', protect, updateOrderStatus); // For testing/admin

module.exports = router;
