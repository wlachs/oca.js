import express from 'express';
import cors from 'cors';
import log from 'npmlog';
import getConfig from './config';
import connect from './core/db';

async function start() {
  log.info('INIT', 'starting server');

  /* Get current configuration */
  const configuration = getConfig();

  /* Init DB */
  await connect();

  /* Initialize express */
  const app = express();

  if (configuration.cors) {
    log.info('INIT', 'Cors enabled');
    app.use(cors);
  }

  app.listen(configuration.port);
  log.info('INIT', 'Server listening on port:', configuration.port);
}

start()
  .then(() => log.info('INIT', 'startup successful'))
  .catch((err) => log.error('INIT', 'an error occurred', err));
