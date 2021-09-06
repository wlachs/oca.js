export function emptyMW(request, response, next) {
  return next();
}

export function conditionalMW(condition, middleware, elseMiddleware) {
  if (!condition || middleware === undefined) {
    return elseMiddleware || emptyMW;
  }
  return middleware;
}

export function asyncMW(fn) {
  return (req, res, next) => {
    fn(req, res, next)
      .catch(next);
  };
}
