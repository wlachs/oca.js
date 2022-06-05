/* Logging */
import log from 'npmlog';

/* Clear DB script for each module */
import clearCustom from '../../custom/dao';
import clearLayout from '../../layout/dao';
import clearAuth from '../../auth/dao';

/* Logging prefix */
const LOG_PREFIX = 'RELEASE_DATA_SERVICES_WIPE_DB';

async function wipeDB() {
  log.info(LOG_PREFIX, 'wipe db');

  return Promise.all([
    clearLayout(),
    clearCustom(),
    clearAuth(),
  ]);
}

export default wipeDB;
