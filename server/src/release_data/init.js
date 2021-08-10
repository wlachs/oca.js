/*
* Plan:
* * connect to DB
* * delete everything from the DB
* * load each file from the initial_data folder
*/

import log from 'npmlog';
import initDB from '../core/db';
import wipeDB from './services/wipe_db';

const LOG_PREFIX = 'RELEASE_DATA_INIT';

log.info(LOG_PREFIX, 'start initialisation');
initDB()
  .then(wipeDB)
  .catch((err) => log.error(LOG_PREFIX, JSON.stringify(err)));
