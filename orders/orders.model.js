var mongoose = require('mongoose')

const Order = new mongoose.Schema({
  itemName: {
    type: String,
    trim: true,
    required: true
  },
  customerName: {
    type: String,
    trim: true,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  customerMobile: {
    type: String,
    trim: true,
    required: true
  },
  customerAddress: {
    city: {
      type: String
    },
    state: {
      type: String
    },
    country: {
      type: String
    }
  },
  amount: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  email: {
    type: String,
    required: true,
    trim: true
  }
})

module.exports = mongoose.model('order', Order)
