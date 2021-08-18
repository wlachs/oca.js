import log from 'npmlog';
import { getApplicationPropertyValue } from '../core/dao/application_property';
import { REQUEST_INITIALIZATION } from './constants';
import wipeDB from './services/wipe_db';
import loadFiles from './services/graphql_loader';

const LOG_PREFIX = 'RELEASE_DATA';
const INIT_DIR = `${__dirname}/resources/initial_data/`;
const UPDATE_DIR = `${__dirname}/resources/update_data/`;

async function init() {
  log.info(LOG_PREFIX, 'init release_data module');

  const shouldInit = await getApplicationPropertyValue(REQUEST_INITIALIZATION, 'true');
  if (String(shouldInit).toLowerCase() === 'true') {
    log.info(LOG_PREFIX, 'initialize system');
    await wipeDB();
    await loadFiles(INIT_DIR, false);
  }

  log.info(LOG_PREFIX, 'update system');
  await loadFiles(UPDATE_DIR, true);
}

export default init;
