import { PROJECT_MODEL_KEY, projectSchema } from './schema/project';
import { APPLICATION_PROPERTY_MODEL_KEY, applicationPropertySchema } from './schema/application_property';

export default new Map([
  [PROJECT_MODEL_KEY, projectSchema],
  [APPLICATION_PROPERTY_MODEL_KEY, applicationPropertySchema],
]);
