import log from 'npmlog';
import { removeAllCustomForModel } from './custom';
import { APPLICATION_PROPERTY_MODEL_KEY } from '../db/schema/application_property';

const LOG_PREFIX = 'CUSTOM_DAO';

// eslint-disable-next-line import/prefer-default-export
export async function clearDB() {
  log.info(LOG_PREFIX, 'clear db');

  return Promise.all([
    removeAllCustomForModel(APPLICATION_PROPERTY_MODEL_KEY),
  ]);
}
