/* Logging */
import log from 'npmlog';

/* DAO references */
import { removeAllUsers } from './user';
import { removeAllRedirects } from './redirect';

/* Logging prefix */
const LOG_PREFIX = 'AUTH_DAO';

// eslint-disable-next-line import/prefer-default-export
export async function clearDB() {
  log.info(LOG_PREFIX, 'clear db');

  return Promise.all([
    removeAllUsers(),
    removeAllRedirects(),
  ]);
}
