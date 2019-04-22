var Joi = require('joi')

exports.createOrders = (req, res, next) => {
  const Schema = Joi.object().keys({
    customerName: Joi.string().required(),
    customerMobile: Joi.string()
      .min(6)
      .max(15)
      .required(),
    customerAddress: Joi.object().keys({
      city: Joi.string().required(),
      state: Joi.string().required(),
      country: Joi.string().required()
    }),
    amount: Joi.number().required(),
    itemName: Joi.string().required(),
    dueDate: Joi.date().required()
  })
  Joi.validate(req.body, Schema, function (error, resp) {
    if (!error) {
      next()
    } else {
      res.status(400).send({
        success: false,
        message: error.details[0].message
      })
    }
  })
}
