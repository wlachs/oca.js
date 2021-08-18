import log from 'npmlog';
import { removeAllProjects } from './project';

const LOG_PREFIX = 'PROJECTS_DAO';

// eslint-disable-next-line import/prefer-default-export
export async function clearDB() {
  log.info(LOG_PREFIX, 'clear db');

  return Promise.all([
    removeAllProjects(),
  ]);
}
