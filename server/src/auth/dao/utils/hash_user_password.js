/* Logging */
import log from 'npmlog';

/* Password encryption */
import { hash } from 'bcrypt';
import getConfig from '../../../config';

/* Logging prefix */
const LOG_PREFIX = 'AUTH_DAO_UTILS_HASH_USER_PASSWORD';

async function hashUserPassword(password) {
  log.info(LOG_PREFIX, 'hashing user password');

  const { auth } = getConfig();
  return hash(password, auth.saltRounds);
}

export default hashUserPassword;
