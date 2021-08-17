import { PROJECT_LIST_QUERY_SUCCESS } from './action_types';

const INITIAL_STATE = {
  projects: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PROJECT_LIST_QUERY_SUCCESS:
      return {
        ...state,
        projects: action.value,
      };

    default:
      return state;
  }
};
