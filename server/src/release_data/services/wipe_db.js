/* Logging */
import log from 'npmlog';

/* Clear DB script for each module */
import { clearDB as clearCore } from '../../custom/dao';
import { clearDB as clearLayout } from '../../layout/dao';
import { clearDB as clearAuth } from '../../auth/dao';

/* Logging prefix */
const LOG_PREFIX = 'RELEASE_DATA_SERVICES_WIPE_DB';

async function wipeDB() {
  log.info(LOG_PREFIX, 'wipe db');

  return Promise.all([
    clearLayout(),
    clearCore(),
    clearAuth(),
  ]);
}

export default wipeDB;
