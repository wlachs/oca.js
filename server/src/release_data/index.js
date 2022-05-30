import log from 'npmlog';
import { REQUEST_INITIALIZATION } from './constants';
import wipeDB from './services/wipe_db';
import loadFiles from './services/graphql_loader';
import { getCustomByKeyOrNull } from '../custom/dao/custom';
import { APPLICATION_PROPERTY_MODEL_KEY } from '../custom/db/schema/application_property';

const LOG_PREFIX = 'RELEASE_DATA';
const INIT_DIR = `${__dirname}/resources/initial_data/`;
const UPDATE_DIR = process.env.OCA_IMPORT_FILE_DIR;

async function init() {
  log.info(LOG_PREFIX, 'init release_data module');

  const shouldInitProperty = await getCustomByKeyOrNull(
    APPLICATION_PROPERTY_MODEL_KEY,
    REQUEST_INITIALIZATION,
  );

  const shouldInit = shouldInitProperty ? shouldInitProperty.value : 'true';
  if (String(shouldInit).toLowerCase() === 'true') {
    log.info(LOG_PREFIX, 'initialize system');
    await wipeDB();
    await loadFiles(INIT_DIR, false);
  }

  if (UPDATE_DIR) {
    log.info(LOG_PREFIX, 'update system');
    await loadFiles(UPDATE_DIR, true);
  } else {
    log.info(LOG_PREFIX, 'skipping system update');
  }
}

export default init;
