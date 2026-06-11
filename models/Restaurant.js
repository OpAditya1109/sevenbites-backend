const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Restaurant name is required'],
      trim: true,
    },
    cuisine: [
      {
        type: String,
        trim: true,
      },
    ],
    category: {
      type: String,
      trim: true,
    },
    rating: {
      type: Number,
      default: 4.0,
      min: 0,
      max: 5,
    },
    totalRatings: {
      type: Number,
      default: 0,
    },
    deliveryTime: {
      type: String,
      default: '30-45 min',
    },
    deliveryFee: {
      type: Number,
      default: 30,
    },
    minOrder: {
      type: Number,
      default: 99,
    },
    image: {
      type: String,
      default: '',
    },
    address: {
      street: String,
      city: { type: String, default: 'Nashik' },
      state: { type: String, default: 'Maharashtra' },
      pincode: String,
    },
    isOpen: {
      type: Boolean,
      default: true,
    },
    isVeg: {
      type: Boolean,
      default: false,
    },
    offer: {
      type: String,
      default: '',
    },
    tags: [String],
  },
  { timestamps: true }
);

// Text index for search
restaurantSchema.index({ name: 'text', cuisine: 'text', category: 'text', tags: 'text' });

module.exports = mongoose.model('Restaurant', restaurantSchema);
