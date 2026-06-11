const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema(
  {
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: [true, 'Item name is required'],
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: 0,
    },
    category: {
      type: String,
      default: 'Main Course',
      trim: true,
    },
    image: {
      type: String,
      default: '',
    },
    isVeg: {
      type: Boolean,
      default: false,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    isBestseller: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 4.0,
      min: 0,
      max: 5,
    },
    spiceLevel: {
      type: String,
      enum: ['mild', 'medium', 'spicy', 'extra-spicy'],
      default: 'medium',
    },
    tags: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model('MenuItem', menuItemSchema);
