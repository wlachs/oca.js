/* Logging */
import log from 'npmlog';

/* Populate */
import { POPULATE_TYPE } from '../db/populators';

/* Data models */
import ContentModel from '../db/content';

/* DAO references */
import { getContentTypeByKey } from './content_type';

/* Logging prefix */
const LOG_PREFIX = 'LAYOUT_DAO_CONTENT';

export async function getContentByKey(key) {
  log.info(LOG_PREFIX, 'get content by key:', key);

  const content = await ContentModel.findOne({ key }).populate(POPULATE_TYPE);
  if (!content) {
    log.error(LOG_PREFIX, 'no content found with key:', key);
    throw new Error(`can't get content, no content found with key: ${key}`);
  }

  log.verbose(LOG_PREFIX, JSON.stringify(content));
  return content;
}

async function getContentByKeyOrNull(key) {
  log.info(LOG_PREFIX, 'get content by key or null:', key);

  try {
    return getContentByKey(key);
  } catch (e) {
    log.info(LOG_PREFIX, 'content with key not found, returning with null', key);
    return null;
  }
}

export async function addContent(key, type, attributes) {
  log.info(LOG_PREFIX, 'add content:', key, type, attributes);

  const existingContent = await getContentByKeyOrNull(key);
  if (existingContent) {
    log.error(LOG_PREFIX, 'content with key already exists', key);
    throw new Error(`can't create content, content with key already exists: ${key}`);
  }

  /* If the content type is not found, an exception is thrown */
  const contentType = await getContentTypeByKey(type);

  const content = new ContentModel();
  content.key = key;
  content.type = contentType;
  content.attributes = attributes;

  log.verbose(LOG_PREFIX, JSON.stringify(content));
  return content.save();
}

export async function updateContent(key, newKey, type, attributes) {
  log.info(LOG_PREFIX, 'update content:', key, newKey, type, attributes);

  /* If the content is not found, an exception is thrown */
  const content = await getContentByKey(key);

  /* If the content type is not found, an exception is thrown */
  const contentType = await getContentTypeByKey(type);

  if (newKey) {
    const contentWithNewKey = await getContentByKeyOrNull(newKey);
    if (contentWithNewKey) {
      log.error(LOG_PREFIX, 'content with key already exists:', newKey);
      throw new Error(`can't update content, content with key already exists: ${newKey}`);
    }
    content.key = newKey;
  }

  content.type = contentType;
  content.attributes = attributes;

  log.verbose(LOG_PREFIX, JSON.stringify(content));
  return content.save();
}

export async function addOrUpdateContent(key, type, attributes) {
  log.info(LOG_PREFIX, 'add or update content:', key, type, attributes);

  try {
    return updateContent(key, undefined, type, attributes);
  } catch (e) {
    return addContent(key, type, attributes);
  }
}

export async function removeContent(key) {
  log.info(LOG_PREFIX, 'delete content:', key);

  /* If the content is not found, an exception is thrown */
  await getContentByKey(key);

  const deleted = await ContentModel.findOneAndDelete({ key }).populate(POPULATE_TYPE);
  log.verbose(LOG_PREFIX, JSON.stringify(deleted));
  return deleted;
}

export async function getContentList() {
  log.info(LOG_PREFIX, 'get content list');

  const contents = await ContentModel.find().populate(POPULATE_TYPE);
  log.verbose(LOG_PREFIX, JSON.stringify(contents));
  return contents;
}

export async function getContentByType(key) {
  log.info(LOG_PREFIX, 'get content by type:', key);

  /* If the content type is not found, an exception is thrown */
  const type = await getContentTypeByKey(key);

  const contents = await ContentModel.find({ type }).populate(POPULATE_TYPE);
  log.verbose(LOG_PREFIX, JSON.stringify(contents));
  return contents;
}

export async function removeAllContent() {
  log.info(LOG_PREFIX, 'remove all content');

  const deleted = await ContentModel.deleteMany().populate(POPULATE_TYPE);
  log.verbose(LOG_PREFIX, JSON.stringify(deleted));
  return deleted;
}
