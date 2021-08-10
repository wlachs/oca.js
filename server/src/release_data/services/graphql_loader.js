import log from 'npmlog';

const LOG_PREFIX = 'RELEASE_DATA_SERVICES_GRAPHQL_LOADER';

export const INIT_MODE = 'INIT_MODE';
export const UPDATE_MODE = 'UPDATE_MODE';

async function loadFiles(mode) {
  log.info(LOG_PREFIX, 'load graphql files with mode:', mode);
  switch (mode) {
    case INIT_MODE: break;
    case UPDATE_MODE: break;
    default:
      log.error(LOG_PREFIX, 'invalid mode:', mode);
      break;
  }
}

export default loadFiles;
