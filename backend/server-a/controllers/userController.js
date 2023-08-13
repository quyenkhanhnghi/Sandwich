require('dotenv').config();
const bcrypt = require('bcryptjs');
const User = require('../models/user.js');
const jwt = require('jsonwebtoken');

/**
 * Get all the users as JSON - need admin's authorization
 * @param {*} req - the request object
 * @param {*} res - the response object
 * @returns
 */
const getAllUsers = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res
      .status(403)
      .json({ message: 'You dont have permission to access' });
  }
  res.json(await User.find({}));
};

/**
 * Get a user from name and send a user as JSON
 * @param {*} req - the request object
 * @param {*} res - the response object
 */
const getUser = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: 'Invalid username' });
  }
};

/**
 * Create a new user and send created user as JSON
 * @param {*} req - the request object
 * @param {*} res - the response object
 * @returns when created successfully
 */
const createUser = async (req, res) => {
  try {
    const user = new User({ ...req.body });

    if ((await User.findOne({ email: user.email })) !== null) {
      return res.status(409).json({ message: 'User already exists' });
    }
    const newUser = await User.create(user);
    return res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * Update a user and send updated user as JSON
 * @param {*} req - the request object
 * @param {*} res - the response object
 */
const updateUser = async (req, res) => {
  try {
    const includepart = ['name', 'email', 'password', 'role'];

    const user = await User.findOne({ email: req.user.email });

    Object.keys(req.body).forEach((key) => {
      if (includepart.includes(key)) {
        user[key] = req.body[key];
      }
    });
    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/**
 * Delete a user and send deleted user as JSON
 * @param {*} req - the request object
 * @param {*} res - the response object
 */
const deleteUser = async (req, res) => {
  try {
    await User.deleteOne({ email: req.user.email });
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: 'Fail to delete user' });
  }
};

/**
 * Get a user by name
 * @param {*} req - the request object
 * @param {*} res - the response object
 * @param {*} next - the next item in an iterator
 * @returns
 */
const getnameUser = async (req, res, next) => {
  let user;
  try {
    user = await User.findOne({ name: req.params.username });

    if (!user || user === undefined) {
      return res.status(404).json({ message: 'NotFound' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  req.user = user;
  next();
};

/**
 * login - sign JSONToken and send back to the server
 * @param {*} req - the request object
 * @param {*} res - the response object
 * @returns when username/password is incorrect
 */
const login = async (req, res) => {
  try {
    const username = req.body.name;
    const password = req.body.password;

    const user = await User.findOne({ name: username });

    if (!user || user === undefined || !(await user.checkPassword(password))) {
      return res
        .status(400)
        .json({ message: 'The username or password is incorrect.' });
    }

    const tokenUser = { name: user.name, email: user.email, role: user.role };
    
    const accessToken = jwt.sign(
      tokenUser,
      process.env.ACCESS_TOKEN_SECRET_KEY
      );

    res.status(200).json({ accessToken: accessToken });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Verify the token and return the next router
 * @param {*} req - the request object
 * @param {*} res - the response object
 * @param {*} next - the next item in an iterator
 * @returns when error is raised
 */
const authToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Authorization token required' });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ message: 'You dont have permission to access' });
    }
    req.user = user;
    next();
  });
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getnameUser,
  login,
  authToken,
};
