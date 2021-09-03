/* Logging */
import log from 'npmlog';

/* Data models */
import ApplicationPropertyModel from '../db/application_property';

/* Logging prefix */
const LOG_PREFIX = 'CORE_DAO_APPLICATION_PROPERTY';

export async function getApplicationPropertyByKey(key) {
  log.info(LOG_PREFIX, 'get applicationProperty by key:', key);

  const applicationProperty = await ApplicationPropertyModel.findOne({ key });
  if (!applicationProperty) {
    log.error(LOG_PREFIX, 'no application property found with key:', key);
    throw new Error(`can't get application property, no application property found with key: ${key}`);
  }

  log.verbose(LOG_PREFIX, JSON.stringify(applicationProperty, undefined, 4));
  return applicationProperty;
}

async function getApplicationPropertyByKeyOrNull(key) {
  log.info(LOG_PREFIX, 'get applicationProperty by key or null:', key);

  try {
    return await getApplicationPropertyByKey(key);
  } catch (e) {
    log.info(LOG_PREFIX, 'application property with key not found, returning with null', key);
    return null;
  }
}

export async function addApplicationProperty(key, value) {
  log.info(LOG_PREFIX, 'add application property:', key, value);

  const existingApplicationProperty = await getApplicationPropertyByKeyOrNull(key);
  if (existingApplicationProperty) {
    log.error(LOG_PREFIX, 'application property with key already exists', key);
    throw new Error(`can't create application property, application property with key already exists: ${key}`);
  }

  const applicationProperty = new ApplicationPropertyModel();
  applicationProperty.key = key;
  applicationProperty.value = value;

  log.verbose(LOG_PREFIX, JSON.stringify(applicationProperty, undefined, 4));
  return applicationProperty.save();
}

export async function updateApplicationProperty(key, newKey, value) {
  log.info(LOG_PREFIX, 'update application property:', key, newKey, value);

  const applicationProperty = await ApplicationPropertyModel.findOne({ key });
  if (!applicationProperty) {
    log.error(LOG_PREFIX, 'no application property found with key:', key);
    throw new Error(`can't update application property, no application property found with key: ${key}`);
  }

  if (newKey) {
    const applicationPropertyWithNewKey = await ApplicationPropertyModel.findOne({ key: newKey });
    if (applicationPropertyWithNewKey) {
      log.error(LOG_PREFIX, 'application property with key already exists:', newKey);
      throw new Error(`can't update application property, application property with key already exists: ${newKey}`);
    }
    applicationProperty.key = newKey;
  }

  applicationProperty.value = value;

  log.verbose(LOG_PREFIX, JSON.stringify(applicationProperty, undefined, 4));
  return applicationProperty.save();
}

export async function addOrUpdateApplicationProperty(key, value) {
  log.info(LOG_PREFIX, 'add or update application property:', key, value);

  try {
    return await updateApplicationProperty(key, undefined, value);
  } catch (e) {
    log.info(LOG_PREFIX, 'application property with key not found, creating', key);
    return addApplicationProperty(key, value);
  }
}

export async function removeApplicationProperty(key) {
  log.info(LOG_PREFIX, 'delete application property:', key);

  /* If the application property is not found, an exception is thrown */
  await getApplicationPropertyByKey(key);

  const deleted = await ApplicationPropertyModel.findOneAndDelete({ key });
  log.verbose(LOG_PREFIX, JSON.stringify(deleted, undefined, 4));
  return deleted;
}

export async function getApplicationPropertyValue(key, fallback) {
  log.info(LOG_PREFIX, 'get applicationProperty value with fallback:', key, fallback);

  const applicationProperty = await getApplicationPropertyByKeyOrNull(key);
  if (!applicationProperty) {
    if (fallback !== undefined) {
      log.verbose(LOG_PREFIX, fallback);
      return fallback;
    }
    log.error(LOG_PREFIX, 'no application property found with key:', key);
    throw new Error(`can't get application property, no application property found with key: ${key}`);
  }

  log.verbose(LOG_PREFIX, JSON.stringify(applicationProperty, undefined, 4));
  return applicationProperty.value;
}

export async function getApplicationPropertyList() {
  log.info(LOG_PREFIX, 'get application property list');

  const applicationProperties = await ApplicationPropertyModel.find();
  log.verbose(LOG_PREFIX, JSON.stringify(applicationProperties, undefined, 4));
  return applicationProperties;
}

export async function removeApplicationProperties() {
  log.info(LOG_PREFIX, 'remove application properties');

  const deleted = await ApplicationPropertyModel.deleteMany();
  log.verbose(LOG_PREFIX, JSON.stringify(deleted, undefined, 4));
  return deleted;
}
