class Conflict extends Error {
  constructor(...args) {
    super(args);
    this.statusCode = 409;
    Error.captureStackTrace(this, Conflict);
  }
}

export default Conflict;
