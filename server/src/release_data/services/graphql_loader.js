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
  const cleanPath = path.replace(/\/$/, '');
  const files = fs.readdirSync(path);

  if (recursive) {
    files
      .forEach((subDirectory) => loadFiles(`${cleanPath}/${subDirectory}`, false));
  } else {
    const promises = files
      .filter((file) => file.match(/^.+\.graphql$/))
      .map((file) => executeFile(fs.readFileSync(`${cleanPath}/${file}`, 'utf-8')));

    await Promise.all(promises);
  }
}

export default loadFiles;
