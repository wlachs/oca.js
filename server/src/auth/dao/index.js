/* Logging */
import log from 'npmlog';

/* DAO references */
import { removeAllUsers } from './user';
import { removeAllUserGroups } from './user_group';

/* Logging prefix */
const LOG_PREFIX = 'AUTH_DAO';

async function clearAuth() {
  log.info(LOG_PREFIX, 'clear db');

  return Promise.all([
    removeAllUsers(),
    removeAllUserGroups(),
  ]);
}

export default clearAuth;
