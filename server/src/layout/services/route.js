import log from 'npmlog';
import { getApplicationPropertyByKey } from '../../core/dao/application_property';
import { DEFAULT_ROUTE_KEY } from '../../core/constants';
import { getRouteByPath } from '../dao/route';

const LOG_PREFIX = 'LAYOUT_SERVICES_ROUTE';

// eslint-disable-next-line import/prefer-default-export
export async function getDefaultRoute() {
  log.info(LOG_PREFIX, 'get default route:');

  const { value } = await getApplicationPropertyByKey(DEFAULT_ROUTE_KEY);
  const route = await getRouteByPath(value);

  log.verbose(LOG_PREFIX, JSON.stringify(route, undefined, 4));
  return route;
}
