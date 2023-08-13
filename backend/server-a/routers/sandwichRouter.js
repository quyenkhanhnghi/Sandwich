const express = require('express');

const { authToken } = require('../controllers/userController');
const {
  getAllSandwich,
  getSandwich,
  createSandwich,
  updateSandwich,
  deleteSandwich,
} = require('../controllers/sandwichControllers');

const sandwichRouter = express.Router();

sandwichRouter.route('/').get(getAllSandwich).post(authToken, createSandwich);

sandwichRouter
  .route('/:sandwichId')
  .get(getSandwich)
  .patch(authToken, updateSandwich)
  .delete(authToken, deleteSandwich);

module.exports = sandwichRouter;
