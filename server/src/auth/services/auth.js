/* Logging */
import log from 'npmlog';

/* JWT */
import { sign } from 'jsonwebtoken';
import { JWT_ALGORITHM, JWT_EXPIRE, JWT_SECRET } from '../../config/secrets';

/* User service */
import { verifyUserPassword } from './user';
import { getRedirectByReferer } from '../dao/redirect';

/* Logging prefix */
const LOG_PREFIX = 'AUTH_SERVICES_USER';

// eslint-disable-next-line import/prefer-default-export
export async function authenticateUser(userID, password, referer) {
  const passwordIsValid = await verifyUserPassword(userID, password);

  if (!passwordIsValid) {
    throw new Error('Authentication failed: incorrect userID or password!');
  }

  const redirect = await getRedirectByReferer(referer);
  const bearer = sign({ userID }, JWT_SECRET, {
    expiresIn: JWT_EXPIRE,
    algorithm: JWT_ALGORITHM,
  });

  log.info(LOG_PREFIX, 'generated session token for user', userID);

  return { bearer, redirect };
}
