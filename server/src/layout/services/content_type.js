/* Logging */
import log from 'npmlog';

/* DAOs */
import { getContentTypeById } from '../dao/content_type';

/* Logging prefix */
const LOG_PREFIX = 'LAYOUT_SERVICES_CONTENT_TYPE';

// eslint-disable-next-line import/prefer-default-export
export async function getContentTypeChain(contentType) {
  log.info(LOG_PREFIX, 'get content type chain of', contentType);

  log.info(LOG_PREFIX, JSON.stringify(contentType, undefined, 4));

  if (contentType.parent) {
    const parent = await getContentTypeById(contentType.parent);
    if (parent) {
      return [contentType.key, ...await getContentTypeChain(parent)];
    }
  }

  return [contentType.key];
}
