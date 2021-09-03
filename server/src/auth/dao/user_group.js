/* Logging */
import log from 'npmlog';

/* Populate */
import { POPULATE_USER_GROUP_KEY } from '../db/populators';

/* Data models */
import UserGroupModel from '../db/user_group';

/* Utils */

/* Logging prefix */
const LOG_PREFIX = 'AUTH_DAO_USER_GROUP';

export async function getUserGroupByKey(key) {
  log.info(LOG_PREFIX, 'get user group by key:', key);

  const userGroup = await UserGroupModel
    .findOne({ key })
    .populate(POPULATE_USER_GROUP_KEY);

  if (!userGroup) {
    log.error(LOG_PREFIX, 'no user group found with key:', key);
    throw new Error(`can't get user group, no user group found with key: ${key}`);
  }

  log.verbose(LOG_PREFIX, JSON.stringify(userGroup));
  return userGroup;
}

export async function getUserGroupByKeyOrNull(key) {
  log.info(LOG_PREFIX, 'get user group by key or null:', key);

  try {
    return await getUserGroupByKey(key);
  } catch (e) {
    log.info(LOG_PREFIX, 'user group with key not found, returning with null', key);
    return null;
  }
}

export async function getUserGroupChain(key) {
  log.info(LOG_PREFIX, 'get user group chain:', key);

  const userGroup = await getUserGroupByKeyOrNull(key);

  if (userGroup.parent) {
    const parentChain = await getUserGroupChain(userGroup.parent.key);
    log.verbose(LOG_PREFIX, JSON.stringify([userGroup, ...parentChain]));
    return [userGroup, ...parentChain];
  }

  log.verbose(LOG_PREFIX, 'root', JSON.stringify(userGroup));
  return [userGroup];
}

export async function addUserGroup(key, parentKey) {
  log.info(LOG_PREFIX, 'add user group:', key, parentKey);

  const existingUserGroup = await getUserGroupByKeyOrNull(key);
  if (existingUserGroup) {
    log.error(LOG_PREFIX, 'user group with key already exists', key);
    throw new Error(`can't create user group, user group with key already exists: ${key}`);
  }

  const userGroup = new UserGroupModel();
  userGroup.key = key;
  userGroup.parent = await getUserGroupByKeyOrNull(parentKey);

  log.verbose(LOG_PREFIX, JSON.stringify(userGroup));
  return userGroup.save();
}

export async function updateUserGroup(key, newKey, parentKey) {
  log.info(LOG_PREFIX, 'update user group:', key, newKey, parentKey);

  /* If the user group is not found, an exception is thrown */
  const userGroup = await getUserGroupByKey(key);

  if (newKey) {
    const userGroupWithNewKey = await getUserGroupByKeyOrNull(newKey);

    if (userGroupWithNewKey) {
      log.error(LOG_PREFIX, 'user group with key already exists:', newKey);
      throw new Error(`can't update user group, user group with key already exists: ${newKey}`);
    }

    userGroup.key = newKey;
  }

  userGroup.parent = await getUserGroupByKeyOrNull(parentKey);

  log.verbose(LOG_PREFIX, JSON.stringify(userGroup));
  return userGroup.save();
}

export async function addOrUpdateUserGroup(key, parentKey) {
  log.info(LOG_PREFIX, 'add or update user group:', key, parentKey);

  try {
    return await updateUserGroup(key, undefined, parentKey);
  } catch (e) {
    log.info(LOG_PREFIX, 'user group with key not found, creating', key, parentKey);
    return addUserGroup(key, parentKey);
  }
}

export async function removeUserGroup(key) {
  log.info(LOG_PREFIX, 'delete user group:', key);

  /* If the user group is not found, an exception is thrown */
  await getUserGroupByKey(key);

  const deleted = await UserGroupModel
    .findOneAndDelete({ key })
    .populate(POPULATE_USER_GROUP_KEY);

  log.verbose(LOG_PREFIX, JSON.stringify(deleted));
  return deleted;
}

export async function getUserGroupList() {
  log.info(LOG_PREFIX, 'get user group list');

  const users = await UserGroupModel
    .find()
    .populate(POPULATE_USER_GROUP_KEY);

  log.verbose(LOG_PREFIX, JSON.stringify(users));
  return users;
}

export async function removeAllUserGroups() {
  log.info(LOG_PREFIX, 'remove all user groups');

  const deleted = await UserGroupModel.deleteMany();
  log.verbose(LOG_PREFIX, JSON.stringify(deleted));
  return deleted;
}
