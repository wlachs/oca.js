/* Logging */
import log from 'npmlog';

/* Errors */
import UnprocessableEntity from '../../../core/errors/unprocessable_entity';

/* Logging prefix */
const LOG_PREFIX = 'LAYOUT_DAO_VALIDATE_ROUTE';

/* Route validation */
const ROUTE_REGEX = /^(\/(([a-zA-Z]*)|(\?[a-zA-Z]+)))+$/;

function validate(route) {
  log.info(LOG_PREFIX, 'validate route:', JSON.stringify(route, undefined, 4));

  const { path } = route;
  log.verbose(LOG_PREFIX, 'match route path with regex', path, ROUTE_REGEX);

  if (path.match(ROUTE_REGEX)) {
    log.info(LOG_PREFIX, 'route valid', JSON.stringify(route, undefined, 4));
  } else {
    log.error(LOG_PREFIX, 'route invalid', JSON.stringify(route, undefined, 4));
    throw new UnprocessableEntity('route validation failed, route invalid');
  }
}

export default validate;
