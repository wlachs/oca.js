/* Logging */
import log from 'npmlog';

/* Data models */
import ProjectModel from './project';

/* Errors */
import NotFoundError from '../../core/errors/not_found';

/* Logging prefix */
const LOG_PREFIX = 'CUSTOM_DB';

/* Model lookup table */
export const CUSTOM_MODEL_TABLE = new Map([
  ['PROJECT', ProjectModel],
]);

export default function findCustomModelByKey(key) {
  log.verbose(LOG_PREFIX, 'lookup custom data type', key);

  const customModel = CUSTOM_MODEL_TABLE.get(key);
  if (customModel) {
    log.verbose(LOG_PREFIX, 'found custom data type with key', key);
    return customModel;
  }

  log.error(LOG_PREFIX, 'no custom data type found with key', key);
  throw new NotFoundError(`no custom data type found with key: ${key}`);
}
