class GenericApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, GenericApiError);
  }
}

export default GenericApiError;
