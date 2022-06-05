import log from 'npmlog';
import { removeAllContent } from './content';
import { removeContentTypes } from './content_type';
import { removeRoutes } from './route';
import { removeSlots } from './slot';
import { removeTemplates } from './template';
import { removeViews } from './view';
import { removeAllRedirects } from './redirect';

const LOG_PREFIX = 'LAYOUT_DAO';

async function clearLayout() {
  log.info(LOG_PREFIX, 'clear db');

  return Promise.all([
    removeAllRedirects(),
    removeRoutes(),
    removeViews(),
    removeTemplates(),
    removeSlots(),
    removeAllContent(),
    removeContentTypes(),
  ]);
}

export default clearLayout;
