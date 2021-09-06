/* Logging */
import log from 'npmlog';

/* Password utils */
import { compare } from 'bcrypt';

/* DAO references */
import { getUserById } from '../dao/user';
import { getUserGroupChain } from '../dao/user_group';

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

export async function isMemberOrAnyGroup(userGroups, accessGroups) {
  log.info(LOG_PREFIX, 'verify user group membership', userGroups, accessGroups);

  const requiredAccessGroups = await Promise.all(
    accessGroups.map((group) => getUserGroupChain(group)),
  );

  const requiredAccessGroupKeys = requiredAccessGroups
    .flat(1)
    .map((group) => group.key);

  const userAccessGroupSet = new Set(userGroups);
  const requiredAccessGroupSet = new Set(requiredAccessGroupKeys);
  const intersection = new Set(
    [...userAccessGroupSet].filter((i) => requiredAccessGroupSet.has(i)),
  );

  log.verbose(LOG_PREFIX, 'matching membership groups', intersection, intersection.size > 0);
  return intersection.size > 0;
}
