const Joi = require('joi')
const Promise = require('bluebird')
const ValidationError = require('../../lib/errors').ValidationError
const ApplicationError = require('../../lib/errors').ApplicationError

const schema = Joi.object({
  customerEmail: Joi.string().required(true),
  customerFullname: Joi.string().required(true)
})

class Confirm {
  constructor (data) {
    this.data = data
  }

  run () {
    return Promise.try(() => {
      let validator = Joi.validate(schema, this.data)
      if (validator.error) {
        throw new ValidationError('OrderConfirm', validator.error)
      }

      return 'success'
    }).catch(error => {
      if (error instanceof ValidationError) {
        throw error
      }

      // log the real error
      console.log(error)
      throw new ApplicationError('OrderConfirm')
    })
  }
}

module.exports = Confirm
