import log from 'npmlog';
import { removeApplicationProperties } from './application_property';

const LOG_PREFIX = 'CORE_DAO';

// eslint-disable-next-line import/prefer-default-export
export async function clearDB() {
  log.info(LOG_PREFIX, 'clear db');

  return Promise.all([
    await removeApplicationProperties(),
  ]);
}
