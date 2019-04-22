// var config = require('config')
// var jwt = require('jsonwebtoken')
// const { encData, decData } = require('./encryption')

// exports.generateToken = function (userDetails, isRefresh = false, callback) {
//   let tokenExpire = isRefresh
//     ? config.get('JWT.refreshTokenExpireAt')
//     : config.get('JWT.accessTokenExpireAt')
//   let SECRET_KEY = isRefresh
//     ? config.get('JWT.REFRESH_SECRET_KEY')
//     : config.get('JWT.ACCESS_SECRET_KEY')

//   var data = {
//     _id: userDetails._id,
//     username: userDetails.userName,
//     email: userDetails.email
//   }
//   var token = jwt.sign({ data: data }, SECRET_KEY, {
//     expiresIn: tokenExpire
//   })
//   if (token) {
//     encData(token, function (err, encHash) {
//       if (!err) {
//         callback(null, encHash)
//       } else {
//         callback({ message: 'Failed to encode the token' })
//       }
//     })
//   } else {
//     callback({ message: 'Failed to generate token' })
//   }
// }

var jwt = require('jsonwebtoken')
var config = require('config')

const { encData, decData } = require('../utilis/encryption')

exports.generateToken = async function (
  userDetails,
  isRefresh = false,
  callback
) {
  let tokenExpires = isRefresh
    ? config.get('JWT.refreshTokenExpireAt')
    : config.get('JWT.accessTokenExpireAt')
  let SECRET_KEY = isRefresh
    ? config.get('JWT.REFRESH_SECRET_KEY')
    : config.get('JWT.ACCESS_SECRET_KEY')
  var data = {
    _id: userDetails._id,
    username: userDetails.userName,
    email: userDetails.email
  }
  var token = jwt.sign({ data: data }, SECRET_KEY, {
    expiresIn: tokenExpires
  })
  if (token) {
    // encrypting the generate token
    await encData(token, function (err, encHash) {
      if (err) {
        callback({
          message: 'Failed to enc the token.'
        })
      } else {
        if (!isRefresh) {
          callback(null, encHash)
        } else {
          callback(null, encHash)
        }
      }
    })
  } else {
    callback('Failed to generate token')
  }
}
