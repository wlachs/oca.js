/* Logging */
import log from 'npmlog';

/* DAO references */
import { getCustomList } from '../../dao/custom';

/* Logging prefix */
const LOG_PREFIX = 'CUSTOM_MAPPING_PROJECT_PROJECT_LIST_TO_COMPONENT';

async function mapProjectListToComponent() {
  log.verbose(LOG_PREFIX, 'map project list to component attributes');
  const projectList = await getCustomList('PROJECT_MODEL');
  return projectList.map((project, key) => ({
    key,
    value: JSON.stringify(project),
  }));
}

export default mapProjectListToComponent;
