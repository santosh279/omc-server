const sessionSchema = require('./sessions.model')
exports.remove = (token, callback) => {
  sessionSchema.findOneAndDelete({ accessToken: token }, function (err, result) {
    if (result) {
      callback(null, result)
    } else {
      callback(err, null)
    }
  })
}
