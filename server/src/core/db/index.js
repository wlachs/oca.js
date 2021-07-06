import mongoose from 'mongoose';
import log from 'npmlog';
import getConfig from '../../config';

export default async function connect() {
  log.info('DB', 'connecting to DB');

  const { db } = getConfig();
  const connectionString = `mongodb://${db.host}:${db.port}/${db.dbName}`;
  log.info('DB', 'db connection string:', connectionString);

  return mongoose.connect(connectionString,
    {
      autoIndex: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
}
