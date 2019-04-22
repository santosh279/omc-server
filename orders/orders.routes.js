var app = require('express').Router()
var orderControllers = require('./orders.controllers')
var orderValidation = require('./orders.validations')
var authMiddleware = require('../utilis/middleware/auth')

app.post(
  '/_createorders',
  authMiddleware.isAuthenticated,
  orderValidation.createOrders,
  orderControllers.createOrders
)

app.get('/_orders', authMiddleware.isAuthenticated, orderControllers.getOrders)

app.put('/:id', authMiddleware.isAuthenticated, orderControllers.editOrder)
app.delete('/:id', authMiddleware.isAuthenticated, orderControllers.deleteOrder)
module.exports = app
