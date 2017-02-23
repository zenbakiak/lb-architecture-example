const ErrorResponse = require('./error-mapper').ErrorResponse

class AbstractError extends Error {
  constructor (message, extra) {
    super(message)
    this.name = this.constructor.name
    this.details = this._initDetails(extra)
    this.statusCode = this.constructor.status()

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor)
    } else {
      this.stack = (new Error(message)).stack
    }
  }

  static status () {
    return 500
  }

  _initDetails (extra) {
    let response = new ErrorResponse(extra)
    return response.mapResponse()
  }
}

module.exports = AbstractError
