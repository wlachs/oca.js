import * as devConfiguration from './dev.json';
import * as prodConfiguration from './production.json';

const guestApi = '/api';
const adminApi = '/api/admin';

// export const authEndpoint = '/auth';

function getEndpoint() {
  switch (process.env.NODE_ENV) {
    case 'production':
      return prodConfiguration.serverUrl;
    case 'stage':
    case 'development':
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
