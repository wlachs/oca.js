import log from 'npmlog';
import { removeAllUsers } from './user';

const LOG_PREFIX = 'AUTH_DAO';

// eslint-disable-next-line import/prefer-default-export
export async function clearDB() {
  log.info(LOG_PREFIX, 'clear db');

  return Promise.all([
    removeAllUsers(),
  ]);
}
