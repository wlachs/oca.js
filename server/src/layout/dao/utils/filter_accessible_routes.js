/* Logging */
import log from 'npmlog';
import { jsonifyRouteList } from '../log/route';

/* Auth services */
import { isMemberOrAnyGroup } from '../../../auth/services/user';

/* Logging prefix */
const LOG_PREFIX = 'LAYOUT_DAO_UTILS_FILTER_ACCESSIBLE_ROUTES';

async function filterAccessibleRoutes(userGroups, routes) {
  log.info(LOG_PREFIX, 'filter accessible routes for user',
    userGroups,
    JSON.stringify(routes.map((r) => r.path), undefined, 4));

  const availabilityMatrix = await Promise.all(routes.map(
    async (r) => isMemberOrAnyGroup(userGroups, r.accessGroups.map((g) => g.key)),
  ));

  const availableRoutes = routes.reduce(
    (matrix, route) => (matrix[0] ? [...matrix.slice(1), route] : matrix.slice(1)),
    availabilityMatrix,
  );

  log.verbose(LOG_PREFIX, jsonifyRouteList(availableRoutes));
  return availableRoutes;
}

export default filterAccessibleRoutes;
