export function emptyMW() {
  return (request, response, next) => next();
}

export function conditionalMW(condition, middleware) {
  if (!condition || middleware === undefined) {
    return emptyMW();
  }
  return middleware;
}
