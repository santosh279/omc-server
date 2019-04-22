var userDBO = require('../users/users.dbo')
var { hashPassword } = require('../utilis/hashPassword')
var sessionModel = require('../sessions/sessions.model')
var sessionDBO = require('../sessions/session.dbo')
var jwt = require('../utilis/jwt')
const async = require('async')

exports.login = function (req, res) {
  let { username, password } = req.body
  async.waterfall(
    [
      function (callback) {
        userDBO.find(username, function (error, resp) {
          if (resp) {
            callback(null, resp)
          } else {
            callback({ message: 'Username not found', success: false })
          }
        })
      },
      function (resp, callback) {
        let resultPassword = resp.password
        let resultSalt = resp.salt
        if (resultPassword === hashPassword(password, resultSalt)) {
          callback(null, resp)
        } else {
          callback({
            message: 'Password mismatch, please try again',
            success: false
          })
        }
      },
      function (userDetails, callback) {
        jwt.generateToken(userDetails, false, function (err, accessToken) {
          if (!err) {
            callback(null, userDetails, accessToken)
          } else {
            callback({
              message: 'Internal server error, please try again',
              success: false
            })
          }
        })
      },
      function (userDetails, accessToken, callback) {
        jwt.generateToken(userDetails, true, function (err, refreshToken) {
          if (!err) {
            sessionModel.insertMany({ accessToken }, function (err, resp) {
              if (!err) {
                callback(null, {
                  message: 'Successfully logged-in',
                  success: true,
                  accessToken,
                  refreshToken
                })
              } else {
                callback({
                  message: 'Error While creating session, please try again',
                  success: false
                })
              }
            })
          } else {
            callback({
              message: 'Internal server error, please try again',
              success: false
            })
          }
        })
      }
    ],
    function (error, result) {
      if (!error) {
        res.status(200).json({ data: result })
      } else {
        res.status(400).json({ error: error })
      }
    }
  )
}

exports.register = function (req, res) {
  let data = {
    userName: req.body.userName,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password
  }
  userDBO.insertMany(data, function (err, resp) {
    if (!err) {
      res
        .status(201)
        .json({ message: 'User Successfully Registered.', success: true })
    } else {
      if (err.code === 11000) {
        res.status(400).json({
          message: 'Email already in use, please try another',
          success: false
        })
      } else {
        res.status(400).json({
          message: 'Error occured, please try again',
          success: false
        })
      }
    }
  })
}

exports.me = function (req, res) {
  let result = req.userDetails
  if (result) {
    res.status(200).send({ data: result })
  } else {
    res.status(400).json({
      message: 'Internal server error, please try again',
      success: false
    })
  }
}

exports.logout = function (req, res) {
  let token = req.headers.authorization.split(' ')[1]
  sessionDBO.remove(token, function (err, resp) {
    if (!err) {
      res
        .status(200)
        .json({ message: 'Successfully logged out.', success: true })
    } else {
      res
        .status(400)
        .json({ message: 'Error occurred, please try again', success: false })
    }
  })
}
