const express = require('express');

const { authToken } = require('../controllers/userController');
const {
  getAllOrders,
  createOrder,
  getOrderUSer,
  deleteOrder,
} = require('../controllers/orderController');

const orderRouter = express.Router();

orderRouter.use(authToken);

orderRouter.route('/all').get(getAllOrders);
orderRouter.route('/').get(getOrderUSer).post(createOrder);
orderRouter.route('/:id').delete(deleteOrder);

module.exports = orderRouter;

