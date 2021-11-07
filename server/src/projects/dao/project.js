/* Logging */
import log from 'npmlog';

/* Data models */
import ProjectModel from '../db/project';

/* Errors */
import NotFoundError from '../../core/errors/not_found';
import Conflict from '../../core/errors/conflict';

/* Logging prefix */
const LOG_PREFIX = 'PROJECTS_DAO_PROJECT';

export async function getProjectByKey(key) {
  log.info(LOG_PREFIX, 'get project by key:', key);

  const project = await ProjectModel.findOne({ key });
  if (!project) {
    log.error(LOG_PREFIX, 'no project found with key:', key);
    throw new NotFoundError(`can't get project, no project found with key: ${key}`);
  }

  log.verbose(LOG_PREFIX, JSON.stringify(project, undefined, 4));
  return project;
}

async function getProjectByKeyOrNull(key) {
  log.info(LOG_PREFIX, 'get project by key or null:', key);

  try {
    return await getProjectByKey(key);
  } catch (e) {
    log.info(LOG_PREFIX, 'project with key not found, returning with null', key);
    return null;
  }
}

export async function addProject(key, name, description, imageUrl, link) {
  log.info(LOG_PREFIX, 'add project:', key, name, description, imageUrl, link);

  const existingProject = await getProjectByKeyOrNull(key);
  if (existingProject) {
    log.error(LOG_PREFIX, 'project with key already exists', key);
    throw new Conflict(`can't create project, project with key already exists: ${key}`);
  }

  const project = new ProjectModel();
  project.key = key;
  project.name = name;
  project.description = description;
  project.imageUrl = imageUrl;
  project.link = link;

  log.verbose(LOG_PREFIX, JSON.stringify(project, undefined, 4));
  return project.save();
}

export async function updateProject(key, newKey, name, description, imageUrl, link) {
  log.info(LOG_PREFIX, 'update project:', key, newKey, name, description, imageUrl, link);

  /* If the project is not found, an exception is thrown */
  const project = await getProjectByKey(key);

  if (newKey) {
    const projectWithNewKey = await getProjectByKeyOrNull(newKey);
    if (projectWithNewKey) {
      log.error(LOG_PREFIX, 'project with key already exists:', newKey);
      throw new Conflict(`can't update project, project with key already exists: ${newKey}`);
    }
    project.key = newKey;
  }

  project.name = name;
  project.description = description;
  project.imageUrl = imageUrl;
  project.link = link;

  log.verbose(LOG_PREFIX, JSON.stringify(project, undefined, 4));
  return project.save();
}

export async function addOrUpdateProject(key, name, description, imageUrl, link) {
  log.info(LOG_PREFIX, 'add or update project:', key, name, description, imageUrl, link);

  try {
    return await updateProject(key, undefined, name, description, imageUrl, link);
  } catch (e) {
    return addProject(key, name, description, imageUrl, link);
  }
}

export async function removeProjectByKey(key) {
  log.info(LOG_PREFIX, 'delete project:', key);

  /* If the project is not found, an exception is thrown */
  await getProjectByKey(key);

  const deleted = await ProjectModel.findOneAndDelete({ key });
  log.verbose(LOG_PREFIX, JSON.stringify(deleted, undefined, 4));
  return deleted;
}

export async function getProjectList() {
  log.info(LOG_PREFIX, 'get project list');

  const projects = await ProjectModel.find();
  log.verbose(LOG_PREFIX, JSON.stringify(projects, undefined, 4));
  return projects;
}

export async function removeAllProjects() {
  log.info(LOG_PREFIX, 'remove all projects');

  const deleted = await ProjectModel.deleteMany();
  log.verbose(LOG_PREFIX, JSON.stringify(deleted, undefined, 4));
  return deleted;
}
