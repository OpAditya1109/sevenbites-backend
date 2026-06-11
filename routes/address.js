const express = require('express');
const router = express.Router();
const { getUserAddresses, addAddress, deleteAddress, setDefaultAddress } = require('../controllers/addressController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getUserAddresses);
router.post('/', protect, addAddress);
router.delete('/:id', protect, deleteAddress);
router.put('/:id/default', protect, setDefaultAddress);

module.exports = router;
