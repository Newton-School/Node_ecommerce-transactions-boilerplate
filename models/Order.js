const mongoose = require('mongoose');
const { Schema } = mongoose;



const orderSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
      validate(value) {
        if (value < 1) {
          throw new Error('Quantity must be a positive number');
        }
      }
    }
  }],
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error('Total price must be a positive number');
      }
    }
  },
  status: {
    type: String,
    enum: ['pending', 'paid', 'shipped', 'delivered'],
    default: 'pending'
  },
  shippingAddress: {
    type: String,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'credit card', 'debit card', 'upi'],
    required: true
  },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;