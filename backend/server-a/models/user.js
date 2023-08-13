const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const { stringify } = require('querystring');
const Schema = mongoose.Schema;

const SALT_ROUNDS = 10;
const SCHEMA_DEFAULTS = {
  name: {
    minLength: 10,
    maxLength: 50,
  },
  email: {
    match:
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  password: {
    minLength: 10,
  },
  role: {
    values: ['admin', 'customer'],
    defaultValue: 'customer',
  },
};

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minLength: SCHEMA_DEFAULTS.name.minLength,
    maxLength: SCHEMA_DEFAULTS.name.maxLength,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: SCHEMA_DEFAULTS.email.match,
  },
  password: {
    type: String,
    required: true,
    minLength: SCHEMA_DEFAULTS.password.minLength,
    set: (password) => {
      if (!password || password === undefined || password.length < SCHEMA_DEFAULTS.password.minLength) {
        throw new Error(`Password must be at least ${SCHEMA_DEFAULTS.password.minLength} characters long`);
      }
      return bcrypt.hashSync(password, SALT_ROUNDS);
    },
  },
  role: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    enum: SCHEMA_DEFAULTS.role.values,
    default: SCHEMA_DEFAULTS.role.defaultValue,
  },
});

/**
 * Compare supplied password with user's own (hashed) password
 *
 * @param {string} password password of user
 * @returns {Promise<boolean>} promise that resolves to the comparison result
 */
userSchema.methods.checkPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.set('toJSON', { virtuals: false, versionKey: false });

const User = new mongoose.model('User', userSchema);
module.exports = User;
