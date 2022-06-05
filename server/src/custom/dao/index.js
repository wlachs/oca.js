/* Logging */
import log from 'npmlog';

/* DAO references */
import { removeAllCustomForModel } from './custom';

/* DB model keys */
import { APPLICATION_PROPERTY_MODEL_KEY } from '../db/schema/application_property';
import { PROJECT_MODEL_KEY } from '../db/schema/project';

/* Logging prefix */
const LOG_PREFIX = 'CUSTOM_DAO';

async function clearCustom() {
  log.info(LOG_PREFIX, 'clear db');

  return Promise.all([
    removeAllCustomForModel(APPLICATION_PROPERTY_MODEL_KEY),
    removeAllCustomForModel(PROJECT_MODEL_KEY),
  ]);
}

export default clearCustom;
