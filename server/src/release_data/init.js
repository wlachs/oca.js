/*
* Plan:
* * connect to DB
* * delete everything from the DB
* * load each file from the initial_data folder
*/

import log from 'npmlog';
import initDB from '../core/db';
import wipeDB from './services/wipe_db';
import loadFiles, { INIT_MODE } from './services/graphql_loader';

const LOG_PREFIX = 'RELEASE_DATA_INIT';

log.info(LOG_PREFIX, 'start initialisation');
initDB()
  .then(wipeDB)
  .then(() => loadFiles(INIT_MODE))
  .then(() => {
    log.info(LOG_PREFIX, 'initialisation successful');
    process.exit();
  })
  .catch((err) => log.error(LOG_PREFIX, JSON.stringify(err)));
