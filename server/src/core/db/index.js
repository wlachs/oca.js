import mongoose from 'mongoose';
import log from 'npmlog';
import getConfig from '../../config';

const LOG_PREFIX = 'CORE_DB';

async function connect() {
  log.info(LOG_PREFIX, 'connecting to DB');

  const { db } = getConfig();
  const connectionString = `mongodb://${db.host}:${db.port}/${db.dbName}`;
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
