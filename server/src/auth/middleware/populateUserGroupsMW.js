/* Logging */
import log from 'npmlog';

/* DAO references */
import { getUserById } from '../dao/user';
import { getUserGroupByKey } from '../dao/user_group';
import { ADMIN_USER_KEY, GUEST_USER_GROUP } from '../constants';

/* Logging prefix */
const LOG_PREFIX = 'AUTH_MIDDLEWARE_POPULATE_USER_GROUPS';

export async function populateUserGroupsMW(request, response, next) {
  log.info(LOG_PREFIX, 'populate user groups if available');

  if (!request.user) {
    log.info(LOG_PREFIX, 'user not authenticated, continue as guest');
    const guestGroup = await getUserGroupByKey(GUEST_USER_GROUP);

    request.user = {
      groups: [guestGroup.key],
    };

    return next();
  }

  try {
    log.info(LOG_PREFIX, 'user authenticated, getting groups');
    const { groups } = await getUserById(request.user.userID);
    request.user.groups = groups.map((g) => g.key);
  } catch (e) {
    log.error(LOG_PREFIX, 'authenticated user not in the system');
    return next(e);
  }

  return next();
}

export async function fakePopulateAdminUserMW(request, response, next) {
  log.info(LOG_PREFIX, 'fake populate admin user group - only for DEBUGGING!');

  request.user = await getUserById(ADMIN_USER_KEY);
  request.user.groups = request.user.groups.map((g) => g.key);

  return next();
}
