/* Logging */
import log from 'npmlog';
import { jsonifyRoute, jsonifyRouteList } from './log/route';

/* Populate */
import { POPULATE_ROUTE_FULL } from '../db/populators';

/* Data models */
import RouteModel from '../db/route';

/* Validate */
import validate from './validators/route_validator';

/* DAO references */
import { getViewByKey } from './view';
import { isMemberOrAnyGroup } from '../../auth/services/user';
import { getUserGroupsByKeys } from '../../auth/dao/user_group';

/* Utils */
import filterAccessibleRoutes from './utils/filter_accessible_routes';

/* Logging prefix */
const LOG_PREFIX = 'LAYOUT_DAO_ROUTE';

export async function getRouteByPath(path, user) {
  log.info(LOG_PREFIX, 'get route by path:', path);

  const route = await RouteModel
    .findOne({ path })
    .populate(POPULATE_ROUTE_FULL);

  if (!route) {
    log.error(LOG_PREFIX, 'no route found with path:', path);
    throw new Error(`can't get route, no route found with path: ${path}`);
  }

  /* If the function is called by the system upon initialization, there is no user object added */
  if (!user) {
    return route;
  }

  const accessGroups = route.accessGroups.map((g) => g.key);
  const hasAccess = await isMemberOrAnyGroup(user.groups, accessGroups);
  if (!hasAccess) {
    log.error(LOG_PREFIX, 'user has no access to route:', path);
    throw new Error(`can't get route, user has no access to route: ${path}`);
  }

  log.verbose(LOG_PREFIX, jsonifyRoute(route));
  return route;
}

async function getRouteByPathOrNull(path, user) {
  log.info(LOG_PREFIX, 'get route by path or null:', path, user);

  try {
    return await getRouteByPath(path, user);
  } catch (e) {
    log.info(LOG_PREFIX, 'route with path not found, returning with null', path);
    return null;
  }
}

export async function addRoute(path, view, accessGroups) {
  log.info(LOG_PREFIX, 'add route:', path, view, accessGroups);

  const existingRoute = await getRouteByPathOrNull(path);
  if (existingRoute) {
    log.error(LOG_PREFIX, 'route with path already exists', path);
    throw new Error(`can't create route, route with path already exists: ${path}`);
  }

  const route = new RouteModel();
  route.path = path;
  route.view = await getViewByKey(view);
  route.accessGroups = await getUserGroupsByKeys(accessGroups);

  validate(route);
  log.verbose(LOG_PREFIX, jsonifyRoute(route));
  return route.save();
}

export async function updateRoute(path, newPath, view, accessGroups) {
  log.info(LOG_PREFIX, 'update route:', path, newPath, view, accessGroups);

  /* If the route is not found, an exception is thrown */
  const route = await getRouteByPath(path);

  if (newPath) {
    const routeWithNewPath = await getRouteByPathOrNull(newPath);
    if (routeWithNewPath) {
      log.error(LOG_PREFIX, 'route with path already exists:', newPath);
      throw new Error(`can't update route, route with path already exists: ${newPath}`);
    }
    route.path = newPath;
  }

  route.view = await getViewByKey(view);
  route.accessGroups = await getUserGroupsByKeys(accessGroups);

  validate(route);
  log.verbose(LOG_PREFIX, jsonifyRoute(route));
  return route.save();
}

export async function addOrUpdateRoute(path, view, accessGroups) {
  log.info(LOG_PREFIX, 'add or update route:', path, view, accessGroups);

  try {
    return await updateRoute(path, undefined, view, accessGroups);
  } catch (e) {
    return addRoute(path, view, accessGroups);
  }
}

export async function removeRoute(path) {
  log.info(LOG_PREFIX, 'delete route:', path);

  /* If the route is not found, an exception is thrown */
  await getRouteByPath(path);

  const deleted = await RouteModel
    .findOneAndDelete({ path })
    .populate(POPULATE_ROUTE_FULL);

  log.verbose(LOG_PREFIX, jsonifyRoute(deleted));
  return deleted;
}

export async function getRouteList(user) {
  log.info(LOG_PREFIX, 'get route list', user);

  const routes = await RouteModel
    .find()
    .populate(POPULATE_ROUTE_FULL);

  if (!user) {
    return routes;
  }

  const availableRoutes = await filterAccessibleRoutes(user.groups, routes);
  log.verbose(LOG_PREFIX, jsonifyRouteList(availableRoutes));
  return availableRoutes;
}

export async function getRouteByView(key, user) {
  log.info(LOG_PREFIX, 'get route by view:', key);

  /* If the view is not found, an exception is thrown */
  const view = await getViewByKey(key);

  const routes = await RouteModel
    .find({ view })
    .populate(POPULATE_ROUTE_FULL);

  if (!user) {
    return routes;
  }

  const availableRoutes = await filterAccessibleRoutes(user.groups, routes);
  log.verbose(LOG_PREFIX, jsonifyRouteList(availableRoutes));
  return availableRoutes;
}

export async function removeRoutes() {
  log.info(LOG_PREFIX, 'delete routes');

  const deleted = await RouteModel.deleteMany();

  log.verbose(LOG_PREFIX, jsonifyRoute(deleted));
  return deleted;
}
