import express from 'express';
import cors from 'cors';
import log from 'npmlog';
import getConfig from './config';

/* Module imports */
import core from './core';
import layout from './layout';

const LOG_PREFIX = 'CORE_INIT';

async function loadModules() {
  log.info(LOG_PREFIX, 'load modules');

  /* Always load core first */
  await core();

  /* Then the rest */
  return Promise.all([
    layout(),
  ]);
}

async function start() {
  log.info(LOG_PREFIX, 'starting server');

  /* Get current configuration */
  const configuration = getConfig();

  /* Initialize modules */
  await loadModules();

  /* Initialize express */
  const app = express();

  if (configuration.cors) {
    log.info(LOG_PREFIX, 'Cors enabled');
    app.use(cors);
  }

  app.listen(configuration.port);
  log.info(LOG_PREFIX, 'Server listening on port:', configuration.port);
}

start()
  .then(() => log.info(LOG_PREFIX, 'startup successful'))
  .catch((err) => log.error(LOG_PREFIX, 'an error occurred', err));
