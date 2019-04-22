const jwt = require('jsonwebtoken')
const config = require('config')
const { decData } = require('../encryption')

exports.isAuthenticated = async function (req, res, next) {
  let token = null
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    token = req.headers.authorization.split(' ')[1]
  }
  if (token === null) {
    res.status(401).json({
      success: false,
      message: 'Unauthorized. Token missing.'
    })
  } else {
    // decrypting the encrypted jwt token
    decData(token, async function (err, decToken) {
      if (err) {
        res.status(400).json({
          success: false,
          message: 'Invalid token.'
        })
      } else {
        await jwt.verify(
          decToken,
          config.get('JWT.ACCESS_SECRET_KEY'),
          function (error, response) {
            if (error) {
              if (error.message === 'jwt expired') {
                res.status(400).json({
                  success: false,
                  message: 'Access token is expired.',
                  errors: error
                })
              } else {
                res.status(400).json({
                  success: false,
                  message: error.message,
                  errors: error
                })
              }
            } else {
              req.userDetails = response.data
              next()
            }
          }
        )
      }
    })
  }
}
