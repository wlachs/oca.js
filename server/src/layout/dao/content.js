import log from 'npmlog';
import ContentModel from '../db/content';
import ContentTypeModel from '../db/content_type';

const LOG_PREFIX = 'LAYOUT_DAO_CONTENT';

export async function addContent(key, type, attributes) {
  log.info(LOG_PREFIX, 'add content:', key, type, attributes);

  const existingContent = ContentModel.findOne({ key });
  if (existingContent) {
    log.error(LOG_PREFIX, 'content with key already exists', key);
    throw new Error(`can't create content, content with key already exists: ${key}`);
  }

  const contentType = await ContentTypeModel.findOne({ key: type });
  if (!contentType) {
    log.error(LOG_PREFIX, 'no content type found with key:', type);
    throw new Error(`can't create content, no content type found with key: ${type}`);
  }

  const content = new ContentModel();
  content.key = key;
  content.type = contentType;
  content.attributes = attributes;

  return content.save();
}

export async function updateContent(key, newKey, type, attributes) {
  log.info(LOG_PREFIX, 'update content:', key, newKey, type, attributes);

  const content = ContentModel.findOne({ key });
  if (!content) {
    log.error(LOG_PREFIX, 'no content found with key:', key);
    throw new Error(`can't update content, no content found with key: ${key}`);
  }

  const contentType = await ContentTypeModel.findOne({ key: type });
  if (!contentType) {
    log.error(LOG_PREFIX, 'no content type found with key:', type);
    throw new Error(`can't update content, no content type found with key: ${type}`);
  }

  if (newKey) {
    content.key = newKey;
  }

  content.type = contentType;
  content.attributes = {
    ...content.attributes,
    ...attributes,
  };

  return content.save();
}

export async function removeContent(key) {
  log.info(LOG_PREFIX, 'delete content:', key);

  const content = ContentModel.findOne({ key });
  if (!content) {
    log.error(LOG_PREFIX, 'no content found with key:', key);
    throw new Error(`can't delete content, no content found with key: ${key}`);
  }

  return ContentModel.findOneAndDelete({ key });
}

export async function getContentByKey(key) {
  log.info(LOG_PREFIX, 'get content by key:', key);

  const content = ContentModel.findOne({ key });
  if (!content) {
    log.error(LOG_PREFIX, 'no content found with key:', key);
    throw new Error(`can't get content, no content found with key: ${key}`);
  }

  return content;
}

export async function getContentList() {
  log.info(LOG_PREFIX, 'get content list');

  return ContentModel.find();
}

export async function getContentByType(key) {
  log.info(LOG_PREFIX, 'get content by type:', key);

  const type = ContentTypeModel.findOne({ key });
  if (!type) {
    log.error(LOG_PREFIX, 'no content type found with key:', key);
    throw new Error(`can't get content, no content type found with key: ${key}`);
  }

  return ContentModel.find({ type });
}
