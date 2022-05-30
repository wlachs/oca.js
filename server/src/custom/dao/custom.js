/* Logging */
import log from 'npmlog';

/* Data models */
import findCustomModelByKey from '../services/modelLookup';

/* Errors */
import NotFoundError from '../../core/errors/not_found';
import Conflict from '../../core/errors/conflict';

/* Logging prefix */
const LOG_PREFIX = 'CORE_DAO_CUSTOM';

export async function getCustomByKey(modelKey, key) {
  log.info(LOG_PREFIX, 'get custom of model and key', modelKey, key);

  const Model = findCustomModelByKey(modelKey);
  const custom = await Model.findOne({ key });
  if (!custom) {
    log.error(LOG_PREFIX, 'no custom found for model with key:', modelKey, key);
    throw new NotFoundError(`can't get custom, no custom found for model ${modelKey} with key: ${key}`);
  }

  log.verbose(LOG_PREFIX, JSON.stringify(custom, undefined, 4));
  return custom;
}

export async function getCustomByKeyOrNull(modelKey, key) {
  log.info(LOG_PREFIX, 'get custom for model by key or null:', modelKey, key);

  try {
    return await getCustomByKey(modelKey, key);
  } catch (e) {
    log.error(LOG_PREFIX, 'custom for model with key not found, returning with null', modelKey, key);
    return null;
  }
}

export async function addCustom(modelKey, key, params) {
  log.info(LOG_PREFIX, 'add custom for model:', modelKey, key, params);

  const existing = await getCustomByKeyOrNull(modelKey, key);
  if (existing) {
    log.error(LOG_PREFIX, 'custom for model with key already exists', modelKey, key);
    throw new Conflict(`can't create custom, custom for model ${modelKey} with key already exists: ${key}`);
  }

  const Model = findCustomModelByKey(modelKey);
  const custom = new Model();
  custom.key = key;

  for (const paramKey in params) {
    custom[paramKey] = params[paramKey];
  }

  log.verbose(LOG_PREFIX, JSON.stringify(custom, undefined, 4));
  return custom.save();
}

export async function updateCustom(modelKey, key, newKey, params) {
  log.info(LOG_PREFIX, 'update custom for model:', modelKey, key, newKey, params);

  /* If the custom is not found, an exception is thrown */
  const custom = await getCustomByKey(modelKey, key);

  if (newKey) {
    const customWithKey = await getCustomByKeyOrNull(modelKey, newKey);
    if (customWithKey) {
      log.error(LOG_PREFIX, 'custom with key already exists:', newKey);
      throw new Conflict(`can't update custom, custom with key already exists: ${newKey}`);
    }
    custom.key = newKey;
  }

  for (const paramKey in params) {
    custom[paramKey] = params[paramKey];
  }

  log.verbose(LOG_PREFIX, JSON.stringify(custom, undefined, 4));
  return custom.save();
}

export async function addOrUpdateCustom(modelKey, key, params) {
  log.info(LOG_PREFIX, 'add or update custom for model:', modelKey, key);

  try {
    return await updateCustom(modelKey, key, undefined, params);
  } catch (e) {
    log.verbose(LOG_PREFIX, 'fallback to adding new item', e);
    return addCustom(modelKey, key, params);
  }
}

export async function removeCustomByKey(modelKey, key) {
  log.info(LOG_PREFIX, 'delete custom for model by key:', modelKey, key);

  /* If the custom is not found, an exception is thrown */
  await getCustomByKey(modelKey, key);

  const Model = findCustomModelByKey(modelKey);
  const deleted = await Model.findOneAndDelete({ key });
  log.verbose(LOG_PREFIX, JSON.stringify(deleted, undefined, 4));
  return deleted;
}

export async function getCustomList(modelKey) {
  log.info(LOG_PREFIX, 'get custom list for model', modelKey);

  const Model = findCustomModelByKey(modelKey);
  const customs = await Model.find();
  log.verbose(LOG_PREFIX, JSON.stringify(customs, undefined, 4));
  return customs;
}

export async function removeAllCustomForModel(modelKey) {
  log.info(LOG_PREFIX, 'remove all custom for model', modelKey);

  const Model = findCustomModelByKey(modelKey);
  const deleted = await Model.deleteMany();
  log.verbose(LOG_PREFIX, JSON.stringify(deleted, undefined, 4));
  return deleted;
}
