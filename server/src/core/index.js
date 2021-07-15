import log from 'npmlog';
import initDB from './db';
import initialization from './services/initialization';

const LOG_PREFIX = 'CORE';

async function init() {
  log.info(LOG_PREFIX, 'init core module');

  /* DB connection */
  await initDB();

  /* Initialization service */
  await initialization();
}

export default init;
