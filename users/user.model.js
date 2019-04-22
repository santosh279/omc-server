var mongoose = require('mongoose')
var crypto = require('crypto')

const usersModel = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: true
  },
  lastName: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  password: {
    type: String,
    trim: true,
    required: true
  },
  userName: {
    type: String,
    trim: true,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  salt: {
    type: String
  }
})

usersModel.pre('validate', function (next) {
  if (this.password) {
    this.salt = crypto.randomBytes(16).toString('base64')
    this.password = this.hashPassword(this.password)
  }
  next()
})

/**
 * Create instance method for hashing a password
 */
usersModel.methods.hashPassword = function (password) {
  if (this.salt && password) {
    return crypto
      .pbkdf2Sync(password, new Buffer(this.salt, 'base64'), 10000, 64, 'SHA1')
      .toString('base64')
  } else {
    return password
  }
}

/**
 * Create instance method for authenticating user
 */
usersModel.methods.authenticate = function (password) {
  return this.password === this.hashPassword(password)
}

module.exports = mongoose.model('user', usersModel)
