/* Logging */
import log from 'npmlog';

/* Services */
import findCustomSchemaByKey from '../../services/schemaLookup';

/* Logging prefix */
const LOG_PREFIX = 'CUSTOM_MAPPING_EDITOR_CUSTOM_EDITOR_FIELDS_TO_COMPONENT';

async function customEditorFieldsToComponent({ attributes }) {
  log.verbose(LOG_PREFIX, 'map custom fields to component attributes');

  const modelKeyAttribute = attributes.find(({ key }) => key === 'modelKey');
  if (!modelKeyAttribute) {
    return attributes;
  }

  const schema = findCustomSchemaByKey(modelKeyAttribute.value);
  const mappedSchema = schema.map((field) => ({
    key: 'field',
    value: field,
  }));

  return [...attributes, ...mappedSchema];
}

export default customEditorFieldsToComponent;
