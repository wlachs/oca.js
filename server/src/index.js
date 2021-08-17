import express from 'express';
import cors from 'cors';
import log from 'npmlog';
import getConfig from './config';
import initRoutes from './routes';

/* Module imports */
import core from './core';

const LOG_PREFIX = 'CORE_INIT';

async function loadModules() {
  log.info(LOG_PREFIX, 'load modules');

  /* Always load core first */
  await core();
}

async function start() {
  log.info(LOG_PREFIX, 'starting server');

  /* Get current configuration */
  const configuration = getConfig();

  /* Set loglevel */
  log.level = configuration.log || 'info';

  /* Initialize modules */
  await loadModules();

  /* Initialize express */
  const app = express();

  if (configuration.cors) {
    log.info(LOG_PREFIX, 'Cors enabled');
    app.use(cors());
  }

  /* Initialize routes */
  initRoutes(app);

  app.listen(configuration.port, () => {
    log.info(LOG_PREFIX, 'Server listening on port:', configuration.port);
  });
}

start()
  .then(() => log.info(LOG_PREFIX, 'startup successful'))
  .catch((err) => log.error(LOG_PREFIX, 'an error occurred', err));
