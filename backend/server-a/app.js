const express = require('express');
const cors = require('cors');

const sandwichRouter = require('./routers/sandwichRouter');
const userRouter = require('./routers/userRouter');
const orderRouter = require('./routers/orderRouter');
const morgan = require('morgan');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', express.static('dist'));
app.use('/orders', express.static('dist'));
app.use('/sandwich/:id', express.static('dist'));

app.use(morgan('short'));
app.use('/api/v1/sandwich', sandwichRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/order', orderRouter);

module.exports = app;
