import log from 'npmlog';
import api from './graphql';

const LOG_PREFIX = 'CORE_ROUTES';

function init(app) {
  log.info(LOG_PREFIX, 'init routes');

  /* API */
  app.use('/api', api);
}

export default init;
