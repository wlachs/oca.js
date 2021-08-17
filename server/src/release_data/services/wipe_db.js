import log from 'npmlog';
import { clearDB as clearCore } from '../../core/dao';
import { clearDB as clearLayout } from '../../layout/dao';
import { clearDB as clearProjects } from '../../projects/dao';

const LOG_PREFIX = 'RELEASE_DATA_SERVICES_WIPE_DB';

async function wipeDB() {
  log.info(LOG_PREFIX, 'wipe db');

  return Promise.all([
    clearCore(),
    clearLayout(),
    clearProjects(),
  ]);
}

export default wipeDB;
