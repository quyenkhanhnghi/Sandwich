const { connectDB, disconnectDB } = require('../models/db');

const sandwiches = require('./sandwiches.json').map((product) => ({
  ...product,
}));

(async () => {
  connectDB();

  try {
    const sandwich = require('../models/sandwich');
    const order = require('../models/order');
    // const sandwichPromise = sandwich
    //   .deleteMany({})
    //   .then(() => sandwich.create(sandwiches));
    // const orderPromise = order.deleteMany({});
    // Promise.all([sandwichPromise, orderPromise]);
    await sandwich.deleteMany({});
    await order.deleteMany({});
    await sandwich.create(sandwiches);
    console.log('Created products');
    console.log('Deleted orders');
  } catch (error) {
    console.log(error);
  }

  disconnectDB();
})();
