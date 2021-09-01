/* Logging */
import log from 'npmlog';

/* Data models */
import ContentTypeModel from '../db/content_type';

/* Logging prefix */
const LOG_PREFIX = 'LAYOUT_DAO_CONTENT_TYPE';

export async function getContentTypeByKey(key) {
  log.info(LOG_PREFIX, 'get content type with key', key);

  const contentType = await ContentTypeModel.findOne({ key });
  if (!contentType) {
    log.error(LOG_PREFIX, 'no content type found with key:', key);
    throw new Error(`can't get content type, no content type found with key: ${key}`);
  }

  log.verbose(LOG_PREFIX, JSON.stringify(contentType));
  return contentType;
}

async function getContentTypeByKeyOrNull(key) {
  log.info(LOG_PREFIX, 'get content type with key or null', key);

  try {
    return await getContentTypeByKey(key);
  } catch (e) {
    log.info(LOG_PREFIX, 'content type with key not found, returning with null', key);
    return null;
  }
}

export async function addContentType(key) {
  log.info(LOG_PREFIX, 'add content type:', key);

  const existingContentType = await getContentTypeByKeyOrNull(key);
  if (existingContentType) {
    log.error(LOG_PREFIX, 'content type with key already exists:', key);
    throw new Error(`can't create content type, content type with key already exists: ${key}`);
  }

  const contentType = new ContentTypeModel();
  contentType.key = key;

  return contentType.save();
}

export async function updateContentType(key, newKey) {
  log.info(LOG_PREFIX, 'update content type:', key, newKey);

  /* If the content type is not found, an exception is thrown */
  const contentType = await getContentTypeByKey(key);

  if (!newKey) {
    log.error(LOG_PREFIX, 'invalid new key:', newKey);
    throw new Error(`can't update content type, invalid new key: ${newKey}`);
  }

  const contentTypeWithNewKey = await getContentTypeByKeyOrNull(newKey);
  if (contentTypeWithNewKey) {
    log.error(LOG_PREFIX, 'content type with key already exists:', newKey);
    throw new Error(`can't update content type, content type with key already exists: ${newKey}`);
  }

  contentType.key = newKey;

  return contentType.save();
}

export async function addOrIgnoreContentType(key) {
  log.info(LOG_PREFIX, 'add or ignore content type:', key);

  try {
    return await getContentTypeByKey(key);
  } catch (e) {
    log.info(LOG_PREFIX, 'content type not found, creating', key);
    return addContentType(key);
  }
}

export async function removeContentType(key) {
  log.info(LOG_PREFIX, 'delete content type:', key);

  /* If the content type is not found, an exception is thrown */
  await getContentTypeByKey(key);

  const deleted = await ContentTypeModel.findOneAndDelete({ key });
  log.verbose(LOG_PREFIX, JSON.stringify(deleted));
  return deleted;
}

export async function getContentTypeList() {
  log.info(LOG_PREFIX, 'get content type list');

  const contentTypes = await ContentTypeModel.find();
  log.verbose(LOG_PREFIX, JSON.stringify(contentTypes));
  return contentTypes;
}

export async function getContentTypeListByKeys(keys) {
  log.info(LOG_PREFIX, 'get content types for set of keys:', keys);

  const contentTypes = await ContentTypeModel.find({ key: { $in: keys } });
  if (contentTypes.length !== keys.length) {
    log.error(LOG_PREFIX, 'invalid content type in key set', keys);
    throw new Error(`invalid content type in key set: ${keys}`);
  }

  log.verbose(LOG_PREFIX, JSON.stringify(contentTypes));
  return contentTypes;
}

export async function removeContentTypes() {
  log.info(LOG_PREFIX, 'remove content types');

  const deleted = await ContentTypeModel.deleteMany();
  log.verbose(LOG_PREFIX, JSON.stringify(deleted));
  return deleted;
}
