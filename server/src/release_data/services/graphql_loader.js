import log from 'npmlog';
import fs from 'fs';
import { parse, execute } from 'graphql';
import { adminSchema } from '../../graphql';

const LOG_PREFIX = 'RELEASE_DATA_SERVICES_GRAPHQL_LOADER';

async function executeFile(content) {
  log.verbose(LOG_PREFIX, 'load:', content);
  return execute(adminSchema, parse(content));
}

async function loadFiles(path, recursive) {
  log.info(LOG_PREFIX, 'load files', path, recursive);
  const cleanPath = path.replace(/\/$/, '');
  const files = fs.readdirSync(path);

  if (recursive) {
    for (const directory of files) {
      await loadFiles(`${cleanPath}/${directory}`, false);
    }
  } else {
    const env = fs.readFileSync(`${cleanPath}/env.json`, 'utf-8');
    const envObject = JSON.parse(env);
    if (!envObject.run) {
      return;
    }

    const gqlFiles = files.filter((file) => file.match(/^.+\.graphql$/));
    for (const file of gqlFiles) {
      await executeFile(fs.readFileSync(`${cleanPath}/${file}`, 'utf-8'));
    }
  }
}

export default loadFiles;
