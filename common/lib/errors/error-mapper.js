class ErrorResponse {
  constructor (error) {
    this.error = error
    this.response = null
  }

  mapResponse () {
    if (this.response) {
      return this.response
    }

    if (!this.error) {
      throw new TypeError('error is empty')
    }

    if (this.error.isJoi) {
      return (this.response = this.mapJoiResponse())
    }

    return (this.response = this.mapStdResponse())
  }

  mapJoiResponse () {
    return {
      error: {
        statusCode: 422,
        name: 'ValidationError',
        message: 'Invalid params',
        details: this.joiDetails()
      }
    }
  }

  joiDetails () {
    let codes = {}
    let messages = {}

    this.error.details.forEach(err => {
      codes[err.path] = err.type
      messages[err.path] = [err.message]
    })

    return {
      context: 'ValidationError',
      codes,
      messages
    }
  }

  mapStdResponse () {
    return {
      error: {
        statusCode: 422,
        name: 'ApplicationError',
        message: this.error.message
      }
    }
  }
}

const addJoiErrorsToModel = function (context, errors) {
  errors.details.forEach((err) => {
    context.errors.add(
      err.path,
      err.message,
      err.type
    )
  })
}

module.exports = {
  ErrorResponse,
  addJoiErrorsToModel
}
