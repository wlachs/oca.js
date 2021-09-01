/* Logging */
import log from 'npmlog';

/* Data models */
import UserModel from '../db/user';

/* Utils */
import hashUserPassword from './utils/hash_user_password';

/* Logging prefix */
const LOG_PREFIX = 'AUTH_DAO_USER';

export async function getUserById(userID) {
  log.info(LOG_PREFIX, 'get user by id:', userID);

  const user = await UserModel.findOne({ userID });
  if (!user) {
    log.error(LOG_PREFIX, 'no user found with id:', userID);
    throw new Error(`can't get user, no user found with id: ${userID}`);
  }

  log.verbose(LOG_PREFIX, JSON.stringify(user));
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

export async function addUser(userID, password) {
  log.info(LOG_PREFIX, 'add user:', userID);

  const existingUser = await getUserByIdOrNull(userID);
  if (existingUser) {
    log.error(LOG_PREFIX, 'user with id already exists', userID);
    throw new Error(`can't create user, user with id already exists: ${userID}`);
  }

  const user = new UserModel();
  user.userID = userID;
  user.passwordHash = await hashUserPassword(password);

  log.verbose(LOG_PREFIX, JSON.stringify(user));
  return user.save();
}

export async function updateUser(userID, newUserID, password) {
  log.info(LOG_PREFIX, 'update user:', userID, newUserID, password);

  /* If the user is not found, an exception is thrown */
  const user = await getUserById(userID);

  if (newUserID) {
    const userWithNewID = await getUserByIdOrNull(newUserID);

    if (userWithNewID) {
      log.error(LOG_PREFIX, 'user with id already exists:', newUserID);
      throw new Error(`can't update user, user with id already exists: ${newUserID}`);
    }

    user.userID = newUserID;
  }

  user.passwordHash = await hashUserPassword(password);

  log.verbose(LOG_PREFIX, JSON.stringify(user));
  return user.save();
}

export async function addOrUpdateUser(userID, password) {
  log.info(LOG_PREFIX, 'add or update user:', userID);

  try {
    return await updateUser(userID, undefined, password);
  } catch (e) {
    log.info(LOG_PREFIX, 'user with id not found, creating', userID);
    return addUser(userID, password);
  }
}

export async function removeUser(userID) {
  log.info(LOG_PREFIX, 'delete user:', userID);

  /* If the user is not found, an exception is thrown */
  await getUserById(userID);

  const deleted = await UserModel.findOneAndDelete({ userID });
  log.verbose(LOG_PREFIX, JSON.stringify(deleted));
  return deleted;
}

export async function getUserList() {
  log.info(LOG_PREFIX, 'get user list');

  const users = await UserModel.find();
  log.verbose(LOG_PREFIX, JSON.stringify(users));
  return users;
}

export async function removeAllUsers() {
  log.info(LOG_PREFIX, 'remove all users');

  const deleted = await UserModel.deleteMany();
  log.verbose(LOG_PREFIX, JSON.stringify(deleted));
  return deleted;
}
