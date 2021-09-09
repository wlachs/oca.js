class UnprocessableEntity extends Error {
  constructor(...args) {
    super(args);
    this.statusCode = 422;
    Error.captureStackTrace(this, UnprocessableEntity);
  }
}

export default UnprocessableEntity;
