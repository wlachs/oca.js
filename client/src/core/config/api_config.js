import devConfiguration from './dev.json';
import prodConfiguration from './production.json';
import { DEVELOPMENT, PRODUCTION, STAGE } from './environment';

const guestApi = '/api';

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

function apiEndpoint() {
  return getEndpoint() + guestApi;
}

export default apiEndpoint;
