import { POPULATE_ROUTE_FULL } from '../../layout/db/populators';

export const POPULATE_REDIRECT_ROUTE = {
  path: 'redirect',
  model: 'Route',
  populate: POPULATE_ROUTE_FULL,
};

export const POPULATE_REFERER_ROUTE = {
  path: 'referer',
  model: 'Route',
  populate: POPULATE_ROUTE_FULL,
};

export const POPULATE_REDIRECT_FULL = [
  POPULATE_REFERER_ROUTE,
  POPULATE_REDIRECT_ROUTE,
];
