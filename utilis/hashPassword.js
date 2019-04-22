var crypto = require('crypto')
exports.hashPassword = function (password, salt) {
  return crypto
    .pbkdf2Sync(password, new Buffer(salt, 'base64'), 10000, 64, 'SHA1')
    .toString('base64')
}
