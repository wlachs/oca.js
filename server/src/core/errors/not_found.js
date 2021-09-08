class NotFoundError extends Error {
  constructor(...args) {
    super(args);
    this.statusCode = 404;
    Error.captureStackTrace(this, NotFoundError);
  }
}

export default NotFoundError;
