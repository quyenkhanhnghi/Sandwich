const Sandwich = require('../models/sandwich');
const User = require('../models/user.js');

/**
 * Get all the sandwiches and send back as JSON
 * @param {*} req - the request object
 * @param {*} res - the response object
 */
const getAllSandwich = async (req, res) => {
  res.json(await Sandwich.find({}));
};

/**
 * Get a sandwich based on the sandwichID and send back as JSON
 * @param {*} req - the request object
 * @param {*} res - the response object
 * @returns when error is returned
 */
const getSandwich = async (req, res) => {
  try {
    const sandwich = await Sandwich.findById(req.params.sandwichId);
    if (!sandwich) {
      return res.status(404).json({ messsage: 'Sandwich not found' });
    }
    res.json(sandwich);
  } catch (err) {
    res.status(400).json({ message: 'Invalid ID' });
  }
};

/**
 * Create a new sandwich and send back as JSON - need admin's authorization
 * @param {*} req - the request object
 * @param {*} res - the response object
 * @returns when created successfully
 */
const createSandwich = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    if (user.role !== 'admin') {
      return res
        .status(403)
        .json({ message: 'You dont have permission to access' });
    }
    const sandwich = new Sandwich({ ...req.body });
    const newSandwich = await Sandwich.create(sandwich);
    return res.status(201).json(newSandwich);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * Update a sandwich and send back as JSON
 * @param {*} req - the request object
 * @param {*} res - the response object
 * @returns when update successfully
 */
const updateSandwich = async (req, res) => {
  try {
    const sandwich = await Sandwich.findByIdAndUpdate(
      req.params.sandwichId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (sandwich === null) {
      return res.status(405).json({ message: 'Invalid input' });
    }
    res.status(200).json(sandwich);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * Delete a sandwich based on the sandwichID - need admin's authorization
 * @param {*} req - the request object
 * @param {*} res - the response object
 * @returns when error is returned
 */
const deleteSandwich = async (req, res) => {
  try {
    const idSandwich = req.params.sandwichId;
    const user = await User.findOne({ email: req.user.email });

    if (user.role !== 'admin') {
      return res
        .status(403)
        .json({ message: 'You dont have permission to access' });
    }

    const sandwich = await Sandwich.findByIdAndDelete(idSandwich);

    if (sandwich === []) {
      return res.status(405).json({ message: 'Invalid input' });
    }
    if (!sandwich) {
      return res.status(404).json({ messsage: 'Sandwich not found' });
    }
    return res.status(204).end();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getAllSandwich,
  getSandwich,
  createSandwich,
  updateSandwich,
  deleteSandwich,
};
