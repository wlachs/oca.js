import localConfiguration from './local.json';
import prodConfiguration from './production.json';
import { DEVELOPMENT, LOCAL, PRODUCTION } from './environment';

function getEndpoint() {
  switch (process.env.NODE_ENV) {
    case LOCAL:
      return localConfiguration.serverUrl;
    case DEVELOPMENT:
      return localConfiguration.serverUrl;
    case PRODUCTION:
      return prodConfiguration.serverUrl;
    default:
      return localConfiguration;
  }
}

function apiEndpoint() {
  return `${getEndpoint()}/api`;
}

export default apiEndpoint;
