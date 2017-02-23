const Joi = require('joi')
const ErrMapper = require('../lib/errors/error-mapper')

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
      ErrMapper.addJoiErrorsToModel(this, validator.error)
      err(false)
    }
  }

  OrderActivity.prototype.inTransit = function () {
    return this.status === 'in_transit'
  }
}
