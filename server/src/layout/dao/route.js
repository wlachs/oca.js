import log from 'npmlog';
import RouteModel from '../db/route';
import ViewModel from '../db/view';
import {
  POPULATE_ROUTE_FULL, POPULATE_VIEW_FULL,
} from '../db/populators';
import validate from './validators/route_validator';

const LOG_PREFIX = 'LAYOUT_DAO_ROUTE';

export async function addRoute(path, view) {
  log.info(LOG_PREFIX, 'add route:', path, view);

  const existingRoute = await RouteModel.findOne({ path });
  if (existingRoute) {
    log.error(LOG_PREFIX, 'route with path already exists', path);
    throw new Error(`can't create route, route with path already exists: ${path}`);
  }

  const existingView = await ViewModel
    .findOne({ key: view })
    .populate(POPULATE_VIEW_FULL);

  if (!existingView) {
    log.error(LOG_PREFIX, 'no view found with key:', view);
    throw new Error(`can't create route, no view type found with key: ${view}`);
  }

  const route = new RouteModel();
  route.path = path;
  route.view = existingView;

  validate(route);
  log.verbose(LOG_PREFIX, JSON.stringify(route));
  return route.save();
}

export async function updateRoute(path, newPath, view) {
  log.info(LOG_PREFIX, 'update route:', path, newPath, view);

  const route = await RouteModel.findOne({ path });
  if (!route) {
    log.error(LOG_PREFIX, 'no route found with path:', path);
    throw new Error(`can't update route, no route found with path: ${path}`);
  }

  const existingView = await ViewModel
    .findOne({ key: view })
    .populate(POPULATE_VIEW_FULL);

  if (!existingView) {
    log.error(LOG_PREFIX, 'no view found with key:', view);
    throw new Error(`can't update route, no view found with key: ${view}`);
  }

  if (newPath) {
    const routeWithNewPath = await RouteModel.findOne({ path: newPath });
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

export async function removeRoute(path) {
  log.info(LOG_PREFIX, 'delete route:', path);

  const route = await RouteModel.findOne({ path });
  if (!route) {
    log.error(LOG_PREFIX, 'no route found with path:', path);
    throw new Error(`can't delete route, no route found with path: ${path}`);
  }

  const deleted = await RouteModel
    .findOneAndDelete({ path })
    .populate(POPULATE_ROUTE_FULL);

  log.verbose(LOG_PREFIX, JSON.stringify(deleted));
  return deleted;
}

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

  const view = await ViewModel.findOne({ key });
  if (!view) {
    log.error(LOG_PREFIX, 'no view found with key:', key);
    throw new Error(`can't get route, no view found with key: ${key}`);
  }

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
