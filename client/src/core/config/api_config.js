import * as devConfiguration from './dev.json';

const guestApi = '/api';
const adminApi = '/api/admin';

// export const authEndpoint = '/auth';

function getEndpoint() {
  switch (process.env.NODE_ENV) {
    case 'production':
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
