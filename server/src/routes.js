import log from 'npmlog';
import layoutRouter from './layout/routes';

const LOG_PREFIX = 'CORE_ROUTES';

function init(app) {
  log.info(LOG_PREFIX, 'init routes');

  /* Layout */
  app.use('/layout', layoutRouter);
}

export default init;
