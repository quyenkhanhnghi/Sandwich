const express = require('express');

const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getnameUser,
  login,
  authToken,
} = require('../controllers/userController');

const userRouter = express.Router();

userRouter.route('/').get(authToken, getAllUsers).post(createUser);

userRouter
  .route('/login')
  .post(login)
  .get(authToken, (req, res) => res.status(200).end());

userRouter
  .route('/:username')
  .get(getnameUser, getUser)
  .patch(getnameUser, authToken, updateUser)
  .delete(getnameUser, authToken, deleteUser);

module.exports = userRouter;
