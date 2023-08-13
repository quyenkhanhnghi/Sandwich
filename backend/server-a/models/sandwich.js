const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sandwichSchema = new Schema({
  name: {
    type: String,
    required: [true, 'A sandwich must have a name'],
    unique: true,
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'A sandwich must have a price'],
  },
  image: {
    type: String,
    required: [true, 'A sandwich must have a image'],
  },
  description: {
    type: String,
    required: [true, 'A sandwich must have a description'],
  },
  toppings: {
    type: [Object],
  },
  breadType: {
    type: String,
    required: [true, 'A sandwich must have a bread type'],
  },
});

const Sandwich = mongoose.model('sandwich', sandwichSchema);

module.exports = Sandwich;
