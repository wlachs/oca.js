import log from 'npmlog';
import {
  DEFAULT_ROUTE,
  DEFAULT_ROUTE_KEY,
} from '../constants';
import { addApplicationProperty, getApplicationPropertyByKey } from '../dao/application_property';

const LOG_PREFIX = 'CORE_SERVICES_INITIALIZATION';

async function initialization() {
  /* Lookup default route */
  const defaultRoute = await getApplicationPropertyByKey(DEFAULT_ROUTE_KEY, null);

  if (defaultRoute === null) {
    log.info(LOG_PREFIX, 'default application route not found, default fallback', DEFAULT_ROUTE);
    /* Add default route if not defined */
    await addApplicationProperty(DEFAULT_ROUTE_KEY, DEFAULT_ROUTE);
  }
}

export default initialization;
