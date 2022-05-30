/* Logging */
import log from 'npmlog';

/* DAO */
import {
  addContentType,
  addOrIgnoreContentType,
  getContentTypeByKey,
  getContentTypeList, removeContentType,
  updateContentType,
} from '../../dao/content_type';

/* Services */
import { getContentTypeChain } from '../../services/content_type';

/* Logging prefix */
const LOG_PREFIX = 'LAYOUT_GRAPHQL_RESOLVERS_CONTENT_TYPE';

async function resolveContentType(contentType) {
  const chain = await getContentTypeChain(contentType);
  return {
    key: contentType.key,
    chain,
  };
}

export async function resolveContentTypeByKey(key) {
  log.info(LOG_PREFIX, 'resolve content type by key', key);

  const contentType = await getContentTypeByKey(key);
  return resolveContentType(contentType);
}

export async function resolveContentTypeList() {
  log.info(LOG_PREFIX, 'resolve content type list');

  const contentTypes = await getContentTypeList();
  return contentTypes.map(resolveContentType);
}

export async function resolveAddContentType(key, parentKey) {
  log.info(LOG_PREFIX, 'resolve add content type', key, parentKey);

  const contentType = await addContentType(key, parentKey);
  return resolveContentType(contentType);
}

export async function resolveAddOrIgnoreContentType(key, parentKey) {
  log.info(LOG_PREFIX, 'resolve add or ignore content type', key, parentKey);

  const contentType = await addOrIgnoreContentType(key, parentKey);
  return resolveContentType(contentType);
}

export async function resolveUpdateContentType(key, newKey, parentKey) {
  log.info(LOG_PREFIX, 'resolve update content type', key, newKey, parentKey);

  const contentType = await updateContentType(key, newKey, parentKey);
  return resolveContentType(contentType);
}

export async function resolveRemoveContentType(key) {
  log.info(LOG_PREFIX, 'resolve remove content type', key);

  const contentType = await removeContentType(key);
  return resolveContentType(contentType);
}
