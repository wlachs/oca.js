/*
* Plan:
* * connect to DB
* * load each file from the release_data subfolders which are marked to be loaded
*/

import log from 'npmlog';
import initDB from '../core/services/initDB';
import loadFiles from './services/graphql_loader';

const LOG_PREFIX = 'RELEASE_DATA_UPDATE';
/* old import dir for locally stored files */
/* const IMPORT_DIR = `${__dirname}/resources/update_data/`; */
const IMPORT_DIR = process.env.OCA_IMPORT_FILE_DIR;

if (IMPORT_DIR) {
  log.info(LOG_PREFIX, 'start update');
  initDB()
    .then(() => loadFiles(IMPORT_DIR, true))
    .then(() => {
      log.info(LOG_PREFIX, 'update successful');
      process.exit();
    })
    .catch((err) => log.error(LOG_PREFIX, JSON.stringify(err, undefined, 4)));
}
