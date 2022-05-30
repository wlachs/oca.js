import ProjectModel, { PROJECT_MODEL_KEY } from './schema/project';
import ApplicationPropertyModel, { APPLICATION_PROPERTY_MODEL_KEY } from './schema/application_property';

export default new Map([
  [PROJECT_MODEL_KEY, ProjectModel],
  [APPLICATION_PROPERTY_MODEL_KEY, ApplicationPropertyModel],
]);
