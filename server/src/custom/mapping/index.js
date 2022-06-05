/* Logging */
import log from 'npmlog';

/* Mappers */
import navLinksToComponent from './navigation/navLinksToComponent';
import adminNavLinksToComponent from './navigation/adminNavLinksToComponent';
import projectListToComponent from './project/projectListToComponent';

/* Errors */
import NotFoundError from '../../core/errors/not_found';

/* Logging prefix */
const LOG_PREFIX = 'CUSTOM_MAPPING';

/* Mapper function lookup table */
const MAPPING_TABLE = new Map([
  ['NAV_LINKS', navLinksToComponent],
  ['ADMIN_NAV_LINKS', adminNavLinksToComponent],
  ['PROJECT_LIST', projectListToComponent],
]);

async function executeMapping(source) {
  log.verbose(LOG_PREFIX, 'execute mapper for source', source);

  const mapperFunction = MAPPING_TABLE.get(source.componentMapper);
  if (mapperFunction) {
    log.verbose(LOG_PREFIX, 'found mapper with key', source.componentMapper);
    return mapperFunction(source);
  }

  log.error(LOG_PREFIX, 'no mapper found with key', source.componentMapper);
  throw new NotFoundError(`no mapper found with key: ${source.componentMapper}`);
}

export default executeMapping;
