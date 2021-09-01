/* Logging */
import log from 'npmlog';

/* Password utils */
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

/* DAO references */
import { getUserById } from '../dao/user';

/* Misc */
import getConfig from '../../config';
import { JWT_SECRET } from '../../config/secrets';

/* Logging prefix */
const LOG_PREFIX = 'AUTH_SERVICES_USER';

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

export async function authenticateUser(userID, password) {
  const passwordIsValid = await verifyUserPassword(userID, password);

  if (!passwordIsValid) {
    throw new Error('Authentication failed: incorrect userID or password!');
  }

  const { auth } = getConfig();
  const value = sign({ userID }, JWT_SECRET, {
    expiresIn: auth.jwtExpire,
  });

  log.info(LOG_PREFIX, 'generated session token for user', userID);

  return { value };
}
