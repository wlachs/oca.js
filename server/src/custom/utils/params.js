import findCustomSchemaByKey from '../services/schemaLookup';

export function parseParams(params) {
  const paramsObject = {};
  for (const { key, value } of params) {
    paramsObject[key] = value;
  }
  return paramsObject;
}

function rewriteParams(modelKey) {
  const schema = findCustomSchemaByKey(modelKey);

  return (data) => {
    const params = [];

    for (const key of schema) {
      if (data[key]) {
        params.push({ key, value: data[key] });
      }
    }

    return { key: data.key, params };
  };
}

export async function rewritePromise(promise, modelKey) {
  const data = await promise;

  if (Array.isArray(data)) {
    return data.map(rewriteParams(modelKey));
  }

  return rewriteParams(data);
}
