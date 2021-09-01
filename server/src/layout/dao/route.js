/* Logging */
import log from 'npmlog';

/* Populate */
import { POPULATE_ROUTE_FULL } from '../db/populators';

/* Data models */
import RouteModel from '../db/route';

/* Validate */
import validate from './validators/route_validator';

/* DAO references */
import { getViewByKey } from './view';

/* Logging prefix */
const LOG_PREFIX = 'LAYOUT_DAO_ROUTE';

export async function getRouteByPath(path) {
  log.info(LOG_PREFIX, 'get route by path:', path);

  const route = await RouteModel
    .findOne({ path })
    .populate(POPULATE_ROUTE_FULL);

  if (!route) {
    log.error(LOG_PREFIX, 'no route found with path:', path);
    throw new Error(`can't get route, no route found with path: ${path}`);
  }

  return route;
}

async function getRouteByPathOrNull(path) {
  log.info(LOG_PREFIX, 'get route by path or null:', path);

  try {
    return getRouteByPath(path);
  } catch (e) {
    log.info(LOG_PREFIX, 'route with path not found, returning with null', path);
    return null;
  }
}

export async function addRoute(path, view) {
  log.info(LOG_PREFIX, 'add route:', path, view);

  const existingRoute = await getRouteByPathOrNull(path);
  if (existingRoute) {
    log.error(LOG_PREFIX, 'route with path already exists', path);
    throw new Error(`can't create route, route with path already exists: ${path}`);
  }

  /* If the view is not found, an exception is thrown */
  const existingView = await getViewByKey(view);

  const route = new RouteModel();
  route.path = path;
  route.view = existingView;

  validate(route);
  log.verbose(LOG_PREFIX, JSON.stringify(route));
  return route.save();
}

export async function updateRoute(path, newPath, view) {
  log.info(LOG_PREFIX, 'update route:', path, newPath, view);

  /* If the route is not found, an exception is thrown */
  const route = await getRouteByPath(path);

  /* If the view is not found, an exception is thrown */
  const existingView = await getViewByKey(view);

  if (newPath) {
    const routeWithNewPath = await getRouteByPathOrNull(newPath);
    if (routeWithNewPath) {
      log.error(LOG_PREFIX, 'route with path already exists:', newPath);
      throw new Error(`can't update route, route with path already exists: ${newPath}`);
    }
    route.path = newPath;
  }

  route.view = existingView;

  validate(route);
  log.verbose(LOG_PREFIX, JSON.stringify(route));
  return route.save();
}

export async function addOrUpdateRoute(path, view) {
  log.info(LOG_PREFIX, 'add or update route:', path, view);

  try {
    return updateRoute(path, undefined, view);
  } catch (e) {
    return addRoute(path, view);
  }
}

export async function removeRoute(path) {
  log.info(LOG_PREFIX, 'delete route:', path);

  /* If the route is not found, an exception is thrown */
  await getRouteByPath(path);

  const deleted = await RouteModel
    .findOneAndDelete({ path })
    .populate(POPULATE_ROUTE_FULL);

  log.verbose(LOG_PREFIX, JSON.stringify(deleted));
  return deleted;
}

export async function getRouteList() {
  log.info(LOG_PREFIX, 'get route list');

  const routes = await RouteModel
    .find()
    .populate(POPULATE_ROUTE_FULL);

  log.verbose(LOG_PREFIX, JSON.stringify(routes));
  return routes;
}

export async function getRouteByView(key) {
  log.info(LOG_PREFIX, 'get route by view:', key);

  /* If the view is not found, an exception is thrown */
  const view = await getViewByKey(key);

  const routes = await RouteModel
    .find({ view })
    .populate(POPULATE_ROUTE_FULL);

  log.verbose(LOG_PREFIX, JSON.stringify(routes));
  return routes;
}

export async function removeRoutes() {
  log.info(LOG_PREFIX, 'delete routes');

  const deleted = await RouteModel
    .deleteMany()
    .populate(POPULATE_ROUTE_FULL);

  log.verbose(LOG_PREFIX, JSON.stringify(deleted));
  return deleted;
}
