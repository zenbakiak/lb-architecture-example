const ConfirmOrder = require('../services/order/confirm')

module.exports = function (Order) {
  Order.confirm = (data, cb) => {
    let confirmOrder = new ConfirmOrder(data)
    confirmOrder.run()
      .then(order => {
        cb(null, order)
      })
      .catch(error => {
        cb(error.response)
      })
  }

  Order.remoteMethod(
    'confirm', {
      accepts: {arg: 'data', type: 'object', http: {source: 'body'}},
      http: {
        path: '/confirm',
        verb: 'post'
      },
      returns: {
        arg: 'response',
        type: 'object',
        root: true
      }
    }
  )
}
