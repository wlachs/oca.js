/* Logging */
import log from 'npmlog';

/* Password utils */
import { compare } from 'bcrypt';

/* DAO references */
import { getUserById } from '../dao/user';

/* Logging prefix */
const LOG_PREFIX = 'AUTH_SERVICES_USER';

// eslint-disable-next-line import/prefer-default-export
export async function verifyUserPassword(userID, password) {
  log.info(LOG_PREFIX, 'verify password for user ID', userID);

  try {
    const user = await getUserById(userID);
    const matches = await compare(password, user.passwordHash);

    log.info(LOG_PREFIX, 'user authentication', user, matches);
    return matches;
  } catch (e) {
    log.info(LOG_PREFIX, 'user with ID not found', userID);
    return false;
  }
}
