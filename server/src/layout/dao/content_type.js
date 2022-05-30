/* Logging */
import log from 'npmlog';

/* Data models */
import ContentTypeModel from '../db/schema/content_type';

/* Errors */
import NotFoundError from '../../core/errors/not_found';
import Conflict from '../../core/errors/conflict';
import UnprocessableEntity from '../../core/errors/unprocessable_entity';

/* Logging prefix */
const LOG_PREFIX = 'LAYOUT_DAO_CONTENT_TYPE';

export async function getContentTypeById(id) {
  log.info(LOG_PREFIX, 'get content type by id', id);

  const contentType = await ContentTypeModel.findById(id);
  if (!contentType) {
    log.error(LOG_PREFIX, 'no content type found with id:', id);
    throw new NotFoundError(`can't get content type, no content type found with id: ${id}`);
  }

  log.verbose(LOG_PREFIX, JSON.stringify(contentType, undefined, 4));
  return contentType;
}

export async function getContentTypeByKey(key) {
  log.info(LOG_PREFIX, 'get content type with key', key);

  const contentType = await ContentTypeModel.findOne({ key });
  if (!contentType) {
    log.error(LOG_PREFIX, 'no content type found with key:', key);
    throw new NotFoundError(`can't get content type, no content type found with key: ${key}`);
  }

  log.verbose(LOG_PREFIX, JSON.stringify(contentType, undefined, 4));
  return contentType;
}

export async function getContentTypeByKeyOrNull(key) {
  log.info(LOG_PREFIX, 'get content type with key or null', key);

  try {
    return await getContentTypeByKey(key);
  } catch (e) {
    log.info(LOG_PREFIX, 'content type with key not found, returning with null', key);
    return null;
  }
}

export async function addContentType(key, parentKey) {
  log.info(LOG_PREFIX, 'add content type:', key, parentKey);

  const existingContentType = await getContentTypeByKeyOrNull(key);
  if (existingContentType) {
    log.error(LOG_PREFIX, 'content type with key already exists:', key);
    throw new Conflict(`can't create content type, content type with key already exists: ${key}`);
  }

  const parent = await getContentTypeByKeyOrNull(parentKey);
  if (!parent) {
    log.error(LOG_PREFIX, 'content type with key not found:', parentKey);
    throw new Conflict(`can't create content type, content type with key not found: ${parentKey}`);
  }

  const contentType = new ContentTypeModel();
  contentType.key = key;
  contentType.parent = parent;

  return contentType.save();
}

export async function updateContentType(key, newKey, parentKey) {
  log.info(LOG_PREFIX, 'update content type:', key, newKey, parentKey);

  /* If the content type is not found, an exception is thrown */
  const contentType = await getContentTypeByKey(key);

  if (!newKey) {
    log.error(LOG_PREFIX, 'invalid new key:', newKey);
    throw new UnprocessableEntity(`can't update content type, invalid new key: ${newKey}`);
  }

  const contentTypeWithNewKey = await getContentTypeByKeyOrNull(newKey);
  if (contentTypeWithNewKey) {
    log.error(LOG_PREFIX, 'content type with key already exists:', newKey);
    throw new Conflict(`can't update content type, content type with key already exists: ${newKey}`);
  }

  const parent = await getContentTypeByKeyOrNull(parentKey);
  if (parentKey && !parent) {
    log.error(LOG_PREFIX, 'content type with key not found:', parentKey);
    throw new Conflict(`can't create content type, content type with key not found: ${parentKey}`);
  }

  contentType.key = newKey;
  contentType.parent = parent;

  return contentType.save();
}

export async function addOrIgnoreContentType(key, parentKey) {
  log.info(LOG_PREFIX, 'add or ignore content type:', key, parentKey);

  try {
    return await getContentTypeByKey(key);
  } catch (e) {
    log.info(LOG_PREFIX, 'content type not found, creating', key, parentKey);
    return addContentType(key, parentKey);
  }
}

export async function removeContentType(key) {
  log.info(LOG_PREFIX, 'delete content type:', key);

  /* If the content type is not found, an exception is thrown */
  await getContentTypeByKey(key);

  const deleted = await ContentTypeModel.findOneAndDelete({ key });
  log.verbose(LOG_PREFIX, JSON.stringify(deleted, undefined, 4));
  return deleted;
}

export async function getContentTypeList() {
  log.info(LOG_PREFIX, 'get content type list');

  const contentTypes = await ContentTypeModel.find();
  log.verbose(LOG_PREFIX, JSON.stringify(contentTypes, undefined, 4));
  return contentTypes;
}

export async function getContentTypeListByKeys(keys) {
  log.info(LOG_PREFIX, 'get content types for set of keys:', keys);

  const contentTypes = await ContentTypeModel.find({ key: { $in: keys } });
  if (contentTypes.length !== keys.length) {
    log.error(LOG_PREFIX, 'invalid content type in key set', keys);
    throw new UnprocessableEntity(`invalid content type in key set: ${keys}`);
  }

  log.verbose(LOG_PREFIX, JSON.stringify(contentTypes, undefined, 4));
  return contentTypes;
}

export async function removeContentTypes() {
  log.info(LOG_PREFIX, 'remove content types');

  const deleted = await ContentTypeModel.deleteMany();
  log.verbose(LOG_PREFIX, JSON.stringify(deleted, undefined, 4));
  return deleted;
}
