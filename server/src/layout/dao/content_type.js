import log from 'npmlog';
import ContentTypeModel from '../db/content_type';

const LOG_PREFIX = 'LAYOUT_DAO_CONTENT_TYPE';

export async function addContentType(key) {
  log.info(LOG_PREFIX, 'add content type:', key);

  const existingContentType = await ContentTypeModel.findOne({ key });
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

  const contentType = await ContentTypeModel.findOne({ key });
  if (!contentType) {
    log.error(LOG_PREFIX, 'no content type found with key:', key);
    throw new Error(`can't update content type, no content type found with key: ${key}`);
  }

  if (!newKey) {
    log.error(LOG_PREFIX, 'invalid new key:', newKey);
    throw new Error(`can't update content type, invalid new key: ${newKey}`);
  }

  const contentTypeWithNewKey = await ContentTypeModel.findOne({ key: newKey });
  if (contentTypeWithNewKey) {
    log.error(LOG_PREFIX, 'content type with key already exists:', newKey);
    throw new Error(`can't update content type, content type with key already exists: ${newKey}`);
  }

  contentType.key = newKey;

  return contentType.save();
}

export async function removeContentType(key) {
  log.info(LOG_PREFIX, 'delete content type:', key);

  const contentType = await ContentTypeModel.findOne({ key });
  if (!contentType) {
    log.error(LOG_PREFIX, 'no content type found with key:', key);
    throw new Error(`can't delete content type, no content type found with key: ${key}`);
  }

  return ContentTypeModel.findOneAndDelete({ key });
}

export async function getContentTypeList() {
  log.info(LOG_PREFIX, 'get content type list');

  return ContentTypeModel.find();
}
