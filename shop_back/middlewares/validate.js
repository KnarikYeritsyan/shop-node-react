import HttpError from "http-errors";

const validate = (schema) => (req, res, next) => {
  try {
    const valid = schema.unknown().validate(req, {
      abortEarly: false,
      dateFormat: 'iso'
    });
    // if (valid.error) {
    //   const errors = {};
    //   valid.error.details.forEach(error => {
    //     error.path.shift();
    //     errors[error.path.join('.')] = error.message;
    //   })
    //   throw HttpError(422, { errors })
    // }

    if (valid.error) {
      const errors = {};
      valid.error.details.forEach(error => {
        // console.log(error)
        error.path.splice(0, error.path.length - 1);
         // let message = error.message.split('"')[2].slice(1)
        // console.log(error.message)
        // console.log(error.message.split('"')[2].slice(1))
        errors[error.path.join('.')] = error.message.split('"')[2];
      })
      throw HttpError(422, { errors })
    }


    next();
  } catch (e) {
    next(e);
  }
}

export default validate
