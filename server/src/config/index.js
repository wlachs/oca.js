import { readFileSync } from 'fs';
import log from 'npmlog';

const FALLBACK_ENV = 'dev';

function readConfig(env) {
  const fileName = `${__dirname}/${env}.json`;
  const fileData = readFileSync(fileName);
  return JSON.parse(fileData.toString());
}

function getConfig() {
  const env = process.env.NODE_ENV || FALLBACK_ENV;
  const config = readConfig(env);
  log.info('CONFIG', 'loaded configuration:', env, config);
  return config;
}

export default getConfig;
