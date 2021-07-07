import log from 'npmlog';
import initDB from './db';

const LOG_PREFIX = 'LAYOUT';

async function init() {
  log.info(LOG_PREFIX, 'init layout module');
  await initDB();
}

export default init;
