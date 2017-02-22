const AbstractError = require('./abstract-error')

class ValidationError extends AbstractError {}
class ApplicationError extends AbstractError {}

module.exports = {
  ValidationError,
  ApplicationError
}
