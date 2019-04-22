var Joi = require('joi')
exports.register = function (req, res, next) {
  const userSchema = Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    userName: Joi.string().required(),
    email: Joi.string()
      .email({ minDomainAtoms: 2 })
      .required(),
    password: Joi.string()
      .min(6)
      .max(30)
      .required(),
    confirmPassword: Joi.equal(Joi.ref('password'))
  })
  Joi.validate(req.body, userSchema, function (error, result) {
    if (error) {
      res.status(400).send({
        success: false,
        message: error.details[0].message
      })
    } else {
      next()
    }
  })
}

exports.login = function (req, res, next) {
  const loginSchema = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string()
      .min(6)
      .max(30)
      .required()
  })
  Joi.validate(req.body, loginSchema, function (error, result) {
    if (error) {
      res.status(400).json({
        success: false,
        message: error.details[0].message
      })
    } else {
      next()
    }
  })
}
