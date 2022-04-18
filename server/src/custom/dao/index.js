import log from 'npmlog';
import { removeAllCustom } from './custom';

const LOG_PREFIX = 'CUSTOM_DAO';

// eslint-disable-next-line import/prefer-default-export
export async function clearDB() {
  log.info(LOG_PREFIX, 'clear db');

  return Promise.all([
    await removeAllCustom(),
  ]);
}
