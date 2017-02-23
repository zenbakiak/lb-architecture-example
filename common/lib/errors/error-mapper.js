const addJoiErrorsToModel = (context, error) => {
  error.details.forEach((err) => {
    context.errors.add(
      err.path,
      err.message,
      err.type
      )
  })
}

module.exports = addJoiErrorsToModel
