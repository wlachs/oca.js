import log from 'npmlog';
import express from 'express';
import path from 'path';
import api from './express';

const LOG_PREFIX = 'CORE_ROUTES';

function init(app) {
  log.info(LOG_PREFIX, 'init routes');

  /* API */
  app.use('/api', api);

  /* Client */
  app.use(express.static(path.join(process.cwd(), 'client')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(`${process.cwd()}/client/index.html`));
  });
}

export default init;
