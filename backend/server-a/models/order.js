const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SCHEMA_DEFAULTS = {
  name: {
    minLength: 1,
    maxLength: 50,
  },
};

const orderItemSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    ref: 'sandwich',
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    minLength: SCHEMA_DEFAULTS.name.minLength,
    maxLength: SCHEMA_DEFAULTS.name.maxLength,
  },

  price: {
    type: Number,
    required: true,
    validate: {
      validator: function (n) {
        return n > 0;
      },
      message: 'Price cannot be 0',
    },
  },

  description: {
    type: String,
    required: [true, 'An order must have a description'],
  },
  toppings: {
    type: [Object],
  },
});

const orderSchema = new Schema({
  customerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  customerName: {
    type: String,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    default: 'ordered',
  },
  orderPrice: {
    type: Number,
    required: true,
  },
  time: {
    orderTime: {
      type: String,
      required: true,
    },
    receiveOrderTime: {
      type: String,
      default: undefined,
    },
    inQueueTime: {
      type: String,
      default: undefined,
    },
    doneTime: {
      type: String,
      default: undefined,
    },
  },
  // for items:
  items: {
    type: [orderItemSchema],
    minLength: 1,
    required: true,
    validate: {
      validator: (items) => items.length > 0,
      message: 'No empty order',
    },
  },
});

// Omit the version key when serialized to JSON
orderSchema.set('toJSON', { virtuals: false, versionKey: false });

const Order = new mongoose.model('Order', orderSchema);
module.exports = Order;
