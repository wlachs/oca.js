class NotAuthorizedError extends Error {
  constructor(...args) {
    super(args);
    Error.captureStackTrace(this, NotAuthorizedError);
  }
}

export default NotAuthorizedError;
