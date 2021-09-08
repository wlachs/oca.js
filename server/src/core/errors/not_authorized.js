class NotAuthorizedError extends Error {
  constructor(...args) {
    super(args);
    this.statusCode = 401;
    Error.captureStackTrace(this, NotAuthorizedError);
  }
}

export default NotAuthorizedError;
