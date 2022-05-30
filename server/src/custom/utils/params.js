const HIDDEN_PROPERTIES = ['key', '_id', '__v'];

export function parseParams(params) {
  const paramsObject = {};
  for (const { key, value } of params) {
    paramsObject[key] = value;
  }
  return paramsObject;
}

function rewriteParams(data) {
  const { _doc } = data;
  const params = [];

  for (const key in _doc) {
    if (!HIDDEN_PROPERTIES.includes(key)) {
      params.push({ key, value: _doc[key] });
    }
  }
  return { key: _doc.key, params };
}

export async function rewritePromise(promise) {
  const data = await promise;

  if (Array.isArray(data)) {
    return data.map(rewriteParams);
  }

  return rewriteParams(data);
}
