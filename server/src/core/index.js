import log from 'npmlog';
import initDB from './db';

const LOG_PREFIX = 'CORE';

async function init() {
  log.info(LOG_PREFIX, 'init core module');

  /* DB connection */
  await initDB();
}

export default init;
