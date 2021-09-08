class RouteAlreadyExistsError extends Error {
  constructor(...args) {
    super(args);
    Error.captureStackTrace(this, RouteAlreadyExistsError);
  }
}

export default RouteAlreadyExistsError;
