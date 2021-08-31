import * as devConfiguration from './dev.json';
import * as prodConfiguration from './production.json';
import { DEVELOPMENT, PRODUCTION, STAGE } from './environment';

const guestApi = '/api';
const adminApi = '/api/admin';

// export const authEndpoint = '/auth';

function getEndpoint() {
  switch (process.env.NODE_ENV) {
    case PRODUCTION:
      return prodConfiguration.serverUrl;
    case STAGE:
    case DEVELOPMENT:
      return devConfiguration.serverUrl;
    default:
      return devConfiguration;
  }
}

export function apiEndpoint() {
  return getEndpoint() + guestApi;
}

export function apiAdminEndpoint() {
  return getEndpoint() + adminApi;
}
