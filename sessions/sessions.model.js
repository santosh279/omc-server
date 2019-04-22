var mongoose = require('mongoose')

const sessionModel = new mongoose.Schema({
  accessToken: {
    type: String,
    required: true
  },
  loggedAt: {
    type: Date,
    default: Date.now()
  },
  loggedOutAt: {
    type: Date,
    default: ''
  }
})

module.exports = mongoose.model('session', sessionModel)
