import log from 'npmlog';
import RouteModel from '../db/route';
import ViewModel from '../db/view';

const LOG_PREFIX = 'LAYOUT_DAO_ROUTE';

export async function addRoute(key, view) {
  log.info(LOG_PREFIX, 'add route:', key, view);

  const existingRoute = await RouteModel.findOne({ key });
  if (existingRoute) {
    log.error(LOG_PREFIX, 'route with key already exists', key);
    throw new Error(`can't create route, route with key already exists: ${key}`);
  }

  const existingView = await ViewModel.findOne({ key: view });
  if (!existingView) {
    log.error(LOG_PREFIX, 'no view found with key:', view);
    throw new Error(`can't create route, no view type found with key: ${view}`);
  }

  const route = new RouteModel();
  route.key = key;
  route.view = existingView;

  return route.save();
}

export async function updateRoute(key, newKey, view) {
  log.info(LOG_PREFIX, 'update route:', key, newKey, view);

  const route = await RouteModel.findOne({ key });
  if (!route) {
    log.error(LOG_PREFIX, 'no route found with key:', key);
    throw new Error(`can't update route, no route found with key: ${key}`);
  }

  const existingView = await ViewModel.findOne({ key: view });
  if (!existingView) {
    log.error(LOG_PREFIX, 'no view found with key:', view);
    throw new Error(`can't update route, no view found with key: ${view}`);
  }

  if (newKey) {
    const routeWithNewKey = await RouteModel.findOne({ key: newKey });
    if (routeWithNewKey) {
      log.error(LOG_PREFIX, 'route with key already exists:', newKey);
      throw new Error(`can't update route, route with key already exists: ${newKey}`);
    }
    route.key = newKey;
  }

  route.view = existingView;

  return route.save();
}

export async function removeRoute(key) {
  log.info(LOG_PREFIX, 'delete route:', key);

  const route = await RouteModel.findOne({ key });
  if (!route) {
    log.error(LOG_PREFIX, 'no route found with key:', key);
    throw new Error(`can't delete route, no route found with key: ${key}`);
  }

  return RouteModel.findOneAndDelete({ key });
}

export async function getRouteByKey(key) {
  log.info(LOG_PREFIX, 'get route by key:', key);

  const route = await RouteModel.findOne({ key });
  if (!route) {
    log.error(LOG_PREFIX, 'no route found with key:', key);
    throw new Error(`can't get route, no route found with key: ${key}`);
  }

  return route;
}

export async function getRouteList() {
  log.info(LOG_PREFIX, 'get route list');

  return RouteModel.find();
}

export async function getRouteByView(key) {
  log.info(LOG_PREFIX, 'get route by view:', key);

  const view = await ViewModel.findOne({ key });
  if (!view) {
    log.error(LOG_PREFIX, 'no view found with key:', key);
    throw new Error(`can't get route, no view found with key: ${key}`);
  }

  return RouteModel.find({ view });
}
