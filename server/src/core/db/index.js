import mongoose from 'mongoose';
import log from 'npmlog';
import getConfig from '../../config';

const LOG_PREFIX = 'CORE_DB';

async function connect() {
  log.info(LOG_PREFIX, 'connecting to DB');

  const config = getConfig();

  /* Set loglevel */
  log.level = config.log || 'info';

  const connectionString = `mongodb://${config.db.host}:${config.db.port}/${config.db.dbName}`;
  log.info(LOG_PREFIX, 'db connection string:', connectionString);

  return mongoose.connect(connectionString,
    {
      autoIndex: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
}

async function initDB() {
  log.info(LOG_PREFIX, 'init core db');
  /* Establish DB connection */
  await connect();
}

export default initDB;
