/* Logging */
import log from 'npmlog';

/* Data models */
import ContentModel from '../db/schema/content';

/* DAO references */
import { getContentTypeByKey } from './content_type';

/* Errors */
import NotFoundError from '../../core/errors/not_found';
import Conflict from '../../core/errors/conflict';

/* Logging prefix */
const LOG_PREFIX = 'LAYOUT_DAO_CONTENT';

export async function getContentByKey(key) {
  log.info(LOG_PREFIX, 'get content by key:', key);

  const content = await ContentModel.findOne({ key });
  if (!content) {
    log.error(LOG_PREFIX, 'no content found with key:', key);
    throw new NotFoundError(`can't get content, no content found with key: ${key}`);
  }

  log.verbose(LOG_PREFIX, JSON.stringify(content, undefined, 4));
  return content;
}

async function getContentByKeyOrNull(key) {
  log.info(LOG_PREFIX, 'get content by key or null:', key);

  try {
    return await getContentByKey(key);
  } catch (e) {
    log.info(LOG_PREFIX, 'content with key not found, returning with null', key);
    return null;
  }
}

export async function addContent(key, type, attributes, componentMapper) {
  log.info(LOG_PREFIX, 'add content:', key, type, JSON.stringify(attributes, undefined, 4));

  const existingContent = await getContentByKeyOrNull(key);
  if (existingContent) {
    log.error(LOG_PREFIX, 'content with key already exists', key);
    throw new Conflict(`can't create content, content with key already exists: ${key}`);
  }

  /* If the content type is not found, an exception is thrown */
  const contentType = await getContentTypeByKey(type);

  const content = new ContentModel();
  content.key = key;
  content.type = contentType;
  content.attributes = attributes;
  content.componentMapper = componentMapper;

  log.verbose(LOG_PREFIX, JSON.stringify(content, undefined, 4));
  return content.save();
}

export async function updateContent(key, newKey, type, attributes, componentMapper) {
  log.info(LOG_PREFIX, 'update content:', key, newKey, type, JSON.stringify(attributes, undefined, 4));

  /* If the content is not found, an exception is thrown */
  const content = await getContentByKey(key);

  /* If the content type is not found, an exception is thrown */
  const contentType = await getContentTypeByKey(type);

  if (newKey) {
    const contentWithNewKey = await getContentByKeyOrNull(newKey);
    if (contentWithNewKey) {
      log.error(LOG_PREFIX, 'content with key already exists:', newKey);
      throw new Conflict(`can't update content, content with key already exists: ${newKey}`);
    }
    content.key = newKey;
  }

  content.type = contentType;
  content.attributes = attributes;
  content.componentMapper = componentMapper;

  log.verbose(LOG_PREFIX, JSON.stringify(content, undefined, 4));
  return content.save();
}

export async function addOrUpdateContent(key, type, attributes, componentMapper) {
  log.info(LOG_PREFIX, 'add or update content:', key, type, JSON.stringify(attributes, undefined, 4));

  try {
    return await updateContent(key, undefined, type, attributes, componentMapper);
  } catch (e) {
    return addContent(key, type, attributes, componentMapper);
  }
}

export async function removeContent(key) {
  log.info(LOG_PREFIX, 'delete content:', key);

  /* If the content is not found, an exception is thrown */
  await getContentByKey(key);

  const deleted = await ContentModel.findOneAndDelete({ key });
  log.verbose(LOG_PREFIX, JSON.stringify(deleted, undefined, 4));
  return deleted;
}

export async function getContentList() {
  log.info(LOG_PREFIX, 'get content list');

  const contents = await ContentModel.find();
  log.verbose(LOG_PREFIX, JSON.stringify(contents, undefined, 4));
  return contents;
}

export async function getContentByType(key) {
  log.info(LOG_PREFIX, 'get content by type:', key);

  /* If the content type is not found, an exception is thrown */
  const type = await getContentTypeByKey(key);

  const contents = await ContentModel.find({ type });
  log.verbose(LOG_PREFIX, JSON.stringify(contents, undefined, 4));
  return contents;
}

export async function removeAllContent() {
  log.info(LOG_PREFIX, 'remove all content');

  const deleted = await ContentModel.deleteMany();
  log.verbose(LOG_PREFIX, JSON.stringify(deleted, undefined, 4));
  return deleted;
}
