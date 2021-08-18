import log from 'npmlog';
import ProjectModel from '../db/project';

const LOG_PREFIX = 'PROJECTS_DAO_PROJECT';

export async function addProject(name, description, imageUrl, link) {
  log.info(LOG_PREFIX, 'add project:', name, description, imageUrl);

  const project = new ProjectModel();
  project.name = name;
  project.description = description;
  project.imageUrl = imageUrl;
  project.link = link;

  log.verbose(LOG_PREFIX, JSON.stringify(project));
  return project.save();
}

export async function updateProject(_id, name, description, imageUrl, link) {
  log.info(LOG_PREFIX, 'update project:', _id, name, description, imageUrl);

  const project = await ProjectModel.findById(_id);
  if (!project) {
    log.error(LOG_PREFIX, 'no project found with _id:', _id);
    throw new Error(`can't update project, no project found with key: ${_id}`);
  }

  project.name = name;
  project.description = description;
  project.imageUrl = imageUrl;
  project.link = link;

  log.verbose(LOG_PREFIX, JSON.stringify(project));
  return project.save();
}

export async function removeProject(_id) {
  log.info(LOG_PREFIX, 'delete project:', _id);

  const project = await ProjectModel.findById(_id);
  if (!project) {
    log.error(LOG_PREFIX, 'no project found with key:', _id);
    throw new Error(`can't delete project, no project found with key: ${_id}`);
  }

  const deleted = await ProjectModel.findByIdAndDelete(_id);
  log.verbose(LOG_PREFIX, JSON.stringify(deleted));
  return deleted;
}

export async function getProjectById(_id) {
  log.info(LOG_PREFIX, 'get project by id:', _id);

  const project = await ProjectModel.findById(_id);
  if (!project) {
    log.error(LOG_PREFIX, 'no project found with _id:', _id);
    throw new Error(`can't get project, no project found with _id: ${_id}`);
  }

  log.verbose(LOG_PREFIX, JSON.stringify(project));
  return project;
}

export async function getProjectList() {
  log.info(LOG_PREFIX, 'get project list');

  const projects = await ProjectModel.find();
  log.verbose(LOG_PREFIX, JSON.stringify(projects));
  return projects;
}

export async function removeAllProjects() {
  log.info(LOG_PREFIX, 'remove all projects');

  const deleted = await ProjectModel.deleteMany();
  log.verbose(LOG_PREFIX, JSON.stringify(deleted));
  return deleted;
}
