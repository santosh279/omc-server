var userSchema = require('../users/user.model')

exports.find = function (username, cb) {
  userSchema.findOne({ userName: username }, function (error, resp) {
    if (resp) {
      cb(null, resp)
    } else {
      cb(error, null)
    }
  })
}

exports.insertMany = (data, cb) => {
  userSchema.insertMany(data, function (error, resp) {
    if (!error) {
      cb(null, resp)
    } else {
      cb(error, null)
    }
  })
}
