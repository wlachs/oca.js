/* Logging */
import log from 'npmlog';

/* Schemas */
import SCHEMAS from '../db/schemas';

/* Errors */
import NotFoundError from '../../core/errors/not_found';

/* Logging prefix */
const LOG_PREFIX = 'CUSTOM_SERVICES_SCHEMA_LOOKUP';

export default function findCustomSchemaByKey(key) {
  log.verbose(LOG_PREFIX, 'lookup custom schema', key);

  const customSchema = SCHEMAS.get(key);
  if (customSchema) {
    log.verbose(LOG_PREFIX, 'found custom schema with key', key);
    return Object.keys(customSchema.obj);
  }

  log.error(LOG_PREFIX, 'no custom schema found with key', key);
  throw new NotFoundError(`no custom schema found with key: ${key}`);
}
