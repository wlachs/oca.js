import { SET_CUSTOM_STATE } from './action_types';

const INITIAL_STATE = {};
export const PATH_SEPARATOR = '.';

function updatePathWithValueRecursive(state, path, value) {
  const [attribute, ...remainingPath] = path;

  if (remainingPath.length === 0) {
    return {
      ...state,
      [attribute]: value,
    };
  }

  return {
    ...state,
    [attribute]: updatePathWithValueRecursive(state[attribute], remainingPath, value),
  };
}

function updatePathWithValue(state, path, value) {
  return updatePathWithValueRecursive(state, path.split(PATH_SEPARATOR), value);
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CUSTOM_STATE:
      return updatePathWithValue(state, action.path, action.value);

    default:
      return state;
  }
};
