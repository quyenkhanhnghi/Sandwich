const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = () => {
  mongoose
    .connect(
      `mongodb+srv://duyduymongo1:sandwich123@cluster0.rg9xia8.mongodb.net/WebShopDb`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      }
    )
    .then(() => {
      console.log('DB connected');
    })
    .catch((err) => {
      console.log('error connecting to MongoDB:', err.message);
    });
};

const disconnectDB = () => {
  mongoose.disconnect();
};

module.exports = { connectDB, disconnectDB };
