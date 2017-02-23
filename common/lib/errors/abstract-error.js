const ErrorResponse = require('./error-mapper').ErrorResponse

class AbstractError extends Error {
  constructor (message, extra) {
    super(message)
    this.name = this.constructor.name
    this.extra = extra
    this.errorResponse = new ErrorResponse(extra)

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor)
    } else {
      this.stack = (new Error(message)).stack
    }
  }

  response () {
    return this.errorResponse.response()
  }
}

module.exports = AbstractError
