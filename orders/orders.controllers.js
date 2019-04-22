var orderModel = require('./orders.model')
var orderDBO = require('./orders.dbo')

exports.createOrders = function (req, res) {
  let {
    itemName,
    customerName,
    customerMobile,
    dueDate,
    customerAddress,
    amount
  } = req.body
  let data = {
    itemName,
    customerName,
    customerAddress,
    customerMobile,
    dueDate,
    amount,
    email: req.userDetails.email
  }

  orderModel.insertMany(data, function (error, resp) {
    if (!error) {
      res
        .status(200)
        .json({ message: 'Order placed successfully', success: true })
    } else {
      res.status(400).json({
        message: 'Error occurreed, please try again' + error,
        success: false
      })
    }
  })
}

exports.getOrders = function (req, res) {
  let email = req.userDetails.email
  orderDBO.find(email, function (error, resp) {
    if (!error) {
      res.status(200).json({ data: resp, success: true })
    } else {
      res.status(400).json({
        message: 'Error while fetching the orders, please try again',
        success: false
      })
    }
  })
}

exports.editOrder = function (req, res) {
  let data = req.body
  let id = req.params.id
  orderDBO.update(id, data, function (err, resp) {
    if (!err) {
      res.status(200).json({ message: 'Successfully updated.', success: true })
    } else {
      res.status(400).json({
        message: 'Error while updating order, please try again',
        success: false
      })
    }
  })
}

exports.deleteOrder = function (req, res) {
  let id = req.params.id
  orderDBO.delete(id, function (err, resp) {
    if (!err) {
      if (resp.n === 1) {
        res
          .status(200)
          .json({ message: 'Successfully deleted.', success: true })
      } else {
        res.status(200).json({
          message: 'No Record Found, please check the id',
          success: false
        })
      }
    } else {
      res.status(400).json({
        message: 'Error while deleting order, please try again',
        success: false
      })
    }
  })
}
