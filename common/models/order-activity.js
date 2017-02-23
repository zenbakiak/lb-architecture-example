const Joi = require('joi')

const codSchema = Joi.object({cod: Joi.object({
  isActive: Joi.boolean().truthy(1).falsy(0).required(),
  amount: Joi.number().required(true)
}).required()
})

module.exports = function (OrderActivity) {
  OrderActivity.validate('cod', validateCod)
  function validateCod (err) {
    let validator = Joi.validate({cod: this.cod}, codSchema)

    if (validator.error) {
      validator.error.details.forEach((err) => {
        this.errors.add(
            err.path,
            err.message,
            err.type
            )
      })
      err(false)
    }
  }

  OrderActivity.prototype.inTransit = function () {
    return this.status === 'in_transit'
  }
}
