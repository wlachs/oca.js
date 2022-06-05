/* Logging */
import log from 'npmlog';

/* Links */
import linkData from './admin_links.json';

/* Logging prefix */
const LOG_PREFIX = 'CUSTOM_MAPPING_NAVIGATION_NAV_LINKS_TO_COMPONENT';

async function mapAdminNavLinksToComponent() {
  log.verbose(LOG_PREFIX, 'map admin nav links component attributes');
  return linkData.links.map(({ text, link }) => ({
    key: text,
    value: link,
  }));
}

export default mapAdminNavLinksToComponent;
