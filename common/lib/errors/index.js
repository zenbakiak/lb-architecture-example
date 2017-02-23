const AbstractError = require('./abstract-error')

class ValidationError extends AbstractError {
  static status () {
    return 422
  }
}
class ApplicationError extends AbstractError {
}

module.exports = {
  ValidationError,
  ApplicationError
}
