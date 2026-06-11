const Address = require('../models/Address');

// @route  GET /api/address  (protected)
const getUserAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ userId: req.user._id }).sort({ isDefault: -1, createdAt: -1 });
    res.json({ success: true, data: addresses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route  POST /api/address  (protected)
const addAddress = async (req, res) => {
  try {
    const { type, label, flatNo, street, landmark, city, state, pincode, isDefault } = req.body;

    if (!street) {
      return res.status(400).json({ success: false, message: 'Street address is required' });
    }

    // If this is default, unset others
    if (isDefault) {
      await Address.updateMany({ userId: req.user._id }, { isDefault: false });
    }

    // If first address, make it default
    const count = await Address.countDocuments({ userId: req.user._id });
    const shouldBeDefault = isDefault || count === 0;

    const address = await Address.create({
      userId: req.user._id,
      type: type || 'Home',
      label,
      flatNo,
      street,
      landmark,
      city: city || 'Nashik',
      state: state || 'Maharashtra',
      pincode,
      isDefault: shouldBeDefault,
    });

    res.status(201).json({ success: true, data: address });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route  DELETE /api/address/:id  (protected)
const deleteAddress = async (req, res) => {
  try {
    const address = await Address.findOne({ _id: req.params.id, userId: req.user._id });

    if (!address) {
      return res.status(404).json({ success: false, message: 'Address not found' });
    }

    await address.deleteOne();

    // If deleted address was default, make the latest one default
    if (address.isDefault) {
      const next = await Address.findOne({ userId: req.user._id }).sort({ createdAt: -1 });
      if (next) {
        next.isDefault = true;
        await next.save();
      }
    }

    res.json({ success: true, message: 'Address deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route  PUT /api/address/:id/default  (protected)
const setDefaultAddress = async (req, res) => {
  try {
    const address = await Address.findOne({ _id: req.params.id, userId: req.user._id });

    if (!address) {
      return res.status(404).json({ success: false, message: 'Address not found' });
    }

    // Unset all defaults for this user
    await Address.updateMany({ userId: req.user._id }, { isDefault: false });

    address.isDefault = true;
    await address.save();

    res.json({ success: true, data: address });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getUserAddresses, addAddress, deleteAddress, setDefaultAddress };
