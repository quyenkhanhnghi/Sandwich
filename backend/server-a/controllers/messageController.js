const User = require('../models/user.js');
const Order = require('../models/order.js');
const socketController = require('../utils/socket-io.js');
/**
 * asdasdasd
 * @param {*} currentOrder 
 * @returns 
 */
const orderAcked = async ( currentOrder ) => {
  try {
    const user = await User.findOne({ _id : currentOrder.customerId });
    const order = await Order.findOne({ _id: currentOrder._id });
    
    order.status = "InQueue";
    order.time.inQueueTime = new Date().toISOString();

    await order.save();
    socketController.updateData(user.name, await Order.find({ customerId : user._id }));
  } catch (error) {
    console.log(error)
  }
  return;
}

const orderNacked = async ( currentOrder ) => {
  try {
    const user = await User.findOne({ _id : currentOrder.customerId });
    const order = await Order.findOne({ _id: currentOrder._id });
    
    order.status = "Failed";
    order.time.doneTime = new Date().toISOString();

    await order.save();
    socketController.updateData(user.name, await Order.find({ customerId : user._id }));
  } catch (error) {
    console.log(error)
  }
}

const orderFilled = async ( currentOrder ) => {
  currentOrder = JSON.parse(currentOrder);
  try {
    const user = await User.findOne({ _id : currentOrder.customerId });
    const order = await Order.findOne({ _id: currentOrder._id });
    
    order.status = "Ready";
    order.time.doneTime = new Date().toISOString();
    
    await order.save();
    socketController.updateData(user.name, await Order.find({ customerId : user._id }));
  } catch (error) {
    console.log(error)
  }
}

module.exports = { orderAcked, orderNacked, orderFilled }