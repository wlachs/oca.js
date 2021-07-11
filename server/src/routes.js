import log from 'npmlog';
import layoutRouter from './layout/routes';
import api from './graphql';

const LOG_PREFIX = 'CORE_ROUTES';

function init(app) {
  log.info(LOG_PREFIX, 'init routes');

  /* Layout */
  app.use('/layout', layoutRouter);

  /* API */
  app.use('/api', api);
}

export default init;
