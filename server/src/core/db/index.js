import mongoose from 'mongoose';
import log from 'npmlog';
import { hashSync } from 'bcrypt';
import getConfig from '../../config';
import ApplicationPropertyModel from './application_property';
import { ADMIN_PASSWORD_DEFAULT, ADMIN_USERNAME_DEFAULT, ADMIN_USERNAME_KEY } from '../constants';

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

  /* Lookup admin credentials */
  log.info(LOG_PREFIX, 'looking for admin credentials');
  const adminCredentials = await ApplicationPropertyModel.findOne({ key: ADMIN_USERNAME_KEY });

  if (adminCredentials === undefined) {
    /* Add default username and password if not defined */
    const defaultAdminCredentials = new ApplicationPropertyModel();
    defaultAdminCredentials.key = ADMIN_USERNAME_DEFAULT;
    defaultAdminCredentials.value = hashSync(ADMIN_PASSWORD_DEFAULT, 10);

    log.info(LOG_PREFIX, 'admin credentials not found, encoding default username and password', ADMIN_USERNAME_DEFAULT, ADMIN_PASSWORD_DEFAULT);
    await defaultAdminCredentials.save();
  }
}

export default initDB;
