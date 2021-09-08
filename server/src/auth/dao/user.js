/* Logging */
import log from 'npmlog';

/* Data models */
import UserModel from '../db/user';

/* Populate */
import { POPULATE_USER } from '../db/populators';

/* Utils */
import hashUserPassword from './utils/hash_user_password';

/* DAO references */
import { getUserGroupsByKeys } from './user_group';

/* Errors */
import NotFoundError from '../../core/errors/not_found';
import Conflict from '../../core/errors/conflict';

/* Logging prefix */
const LOG_PREFIX = 'AUTH_DAO_USER';

export async function getUserById(userID) {
  log.info(LOG_PREFIX, 'get user by id:', userID);

  const user = await UserModel
    .findOne({ userID })
    .populate(POPULATE_USER);

  if (!user) {
    log.error(LOG_PREFIX, 'no user found with id:', userID);
    throw new NotFoundError(`can't get user, no user found with id: ${userID}`);
  }

  log.verbose(LOG_PREFIX, JSON.stringify(user, undefined, 4));
  return user;
}

export async function getUserByIdOrNull(userID) {
  log.info(LOG_PREFIX, 'get user by id or null:', userID);

  try {
    return await getUserById(userID);
  } catch (e) {
    log.info(LOG_PREFIX, 'user with id not found, returning with null', userID);
    return null;
  }
}

export async function addUser(userID, password, groups) {
  log.info(LOG_PREFIX, 'add user:', userID, groups);

  const existingUser = await getUserByIdOrNull(userID);
  if (existingUser) {
    log.error(LOG_PREFIX, 'user with id already exists', userID);
    throw new Conflict(`can't create user, user with id already exists: ${userID}`);
  }

  const user = new UserModel();
  user.userID = userID;
  user.passwordHash = await hashUserPassword(password);
  user.groups = await getUserGroupsByKeys(groups);

  log.verbose(LOG_PREFIX, JSON.stringify(user, undefined, 4));
  return user.save();
}

export async function updateUser(userID, newUserID, password, groups) {
  log.info(LOG_PREFIX, 'update user:', userID, newUserID, groups);

  /* If the user is not found, an exception is thrown */
  const user = await getUserById(userID);

  if (newUserID) {
    const userWithNewID = await getUserByIdOrNull(newUserID);

    if (userWithNewID) {
      log.error(LOG_PREFIX, 'user with id already exists:', newUserID);
      throw new Conflict(`can't update user, user with id already exists: ${newUserID}`);
    }

    user.userID = newUserID;
  }

  user.passwordHash = await hashUserPassword(password);
  user.groups = await getUserGroupsByKeys(groups);

  log.verbose(LOG_PREFIX, JSON.stringify(user, undefined, 4));
  return user.save();
}

export async function addOrUpdateUser(userID, password, groups) {
  log.info(LOG_PREFIX, 'add or update user:', userID, groups);

  try {
    return await updateUser(userID, undefined, password, groups);
  } catch (e) {
    log.info(LOG_PREFIX, 'user with id not found, creating', userID);
    return addUser(userID, password, groups);
  }
}

export async function removeUser(userID) {
  log.info(LOG_PREFIX, 'delete user:', userID);

  /* If the user is not found, an exception is thrown */
  await getUserById(userID);

  const deleted = await UserModel
    .findOneAndDelete({ userID })
    .populate(POPULATE_USER);

  log.verbose(LOG_PREFIX, JSON.stringify(deleted, undefined, 4));
  return deleted;
}

export async function getUserList() {
  log.info(LOG_PREFIX, 'get user list');

  const users = await UserModel
    .find()
    .populate(POPULATE_USER);

  log.verbose(LOG_PREFIX, JSON.stringify(users, undefined, 4));
  return users;
}

export async function removeAllUsers() {
  log.info(LOG_PREFIX, 'remove all users');

  const deleted = await UserModel
    .deleteMany()
    .populate(POPULATE_USER);

  log.verbose(LOG_PREFIX, JSON.stringify(deleted, undefined, 4));
  return deleted;
}
