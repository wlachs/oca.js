/* Logging */
import log from 'npmlog';

/* DAO references */
import { getRouteByPath } from '../dao/route';
import { getCustomByKeyOrNull } from '../../custom/dao/custom';

/* Model key */
import { APPLICATION_PROPERTY_MODEL_KEY } from '../../custom/db/schema/application_property';

/* Route key */
import { DEFAULT_ROUTE_KEY } from '../../core/constants';

/* Logging prefix */
const LOG_PREFIX = 'LAYOUT_SERVICES_ROUTE';

// eslint-disable-next-line import/prefer-default-export
export async function getDefaultRoute() {
  log.info(LOG_PREFIX, 'get default route:');

  const defaultRouteProperty = await getCustomByKeyOrNull(
    APPLICATION_PROPERTY_MODEL_KEY,
    DEFAULT_ROUTE_KEY,
  );

  const value = defaultRouteProperty ? defaultRouteProperty.value : '/';
  const route = await getRouteByPath(value);

  log.verbose(LOG_PREFIX, JSON.stringify(route, undefined, 4));
  return route;
}
