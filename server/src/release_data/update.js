/*
* Plan:
* * connect to DB
* * load each file from the release_data subfolders which are marked to be loaded
*/

import log from 'npmlog';
import initDB from '../core/db';
import loadFiles, { UPDATE_MODE } from './services/graphql_loader';

const LOG_PREFIX = 'RELEASE_DATA_UPDATE';

log.info(LOG_PREFIX, 'start update');
initDB()
  .then(() => loadFiles(UPDATE_MODE))
  .then(() => {
    log.info(LOG_PREFIX, 'update successful');
    process.exit();
  })
  .catch((err) => log.error(LOG_PREFIX, JSON.stringify(err)));
