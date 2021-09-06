import log from 'npmlog';
import { removeAllContent } from './content';
import { removeContentTypes } from './content_type';
import { removeRoutes } from './route';
import { removeSlots } from './slot';
import { removeTemplates } from './template';
import { removeViews } from './view';
import { removeAllRedirects } from './redirect';

const LOG_PREFIX = 'LAYOUT_DAO';

// eslint-disable-next-line import/prefer-default-export
export async function clearDB() {
  log.info(LOG_PREFIX, 'clear db');

  return Promise.all([
    removeAllContent(),
    removeContentTypes(),
    removeRoutes(),
    removeSlots(),
    removeTemplates(),
    removeViews(),
    removeAllRedirects(),
  ]);
}
