var orderSchema = require('./orders.model')

exports.find = (email, cb) => {
  orderSchema.find({ email: email }, function (err, resp) {
    if (!err) {
      cb(null, resp)
    } else {
      cb(err, null)
    }
  })
}

exports.update = async (id, data, cb) => {
  await orderSchema.updateOne({ _id: id }, { $set: data }, { new: true }, function (
    err,
    resp
  ) {
    if (!err) {
      cb(null, resp)
    } else {
      cb(err, null)
    }
  })
}

exports.delete = async (id, cb) => {
  await orderSchema.deleteOne({ _id: id }, function (err, resp) {
    if (!err) {
      cb(null, resp)
    } else {
      cb(err, null)
    }
  })
}
