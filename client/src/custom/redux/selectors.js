/* Redux */
import { PATH_SEPARATOR } from './reducer';

function getValueForPathRecursive(state, path) {
  if (!state) {
    return undefined;
  }

  const [attribute, ...remainingPath] = path;
  if (remainingPath.length === 0) {
    return state[attribute];
  }

  return getValueForPathRecursive(state[attribute], remainingPath);
}

// eslint-disable-next-line import/prefer-default-export
export function getValueForPath(path) {
  return (state) => getValueForPathRecursive(state.custom, path.split(PATH_SEPARATOR));
}
