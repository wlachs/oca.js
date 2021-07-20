import {
  ROUTE_QUERY_ERROR, ROUTE_QUERY_START, ROUTE_QUERY_SUCCESS, SET_PATH,
} from './action_types';

const INITIAL_STATE = {
  loading: null,
  error: null,
  route: null,
  path: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ROUTE_QUERY_START:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case ROUTE_QUERY_SUCCESS:
      return {
        ...state,
        loading: false,
        route: action.value,
      };

    case ROUTE_QUERY_ERROR:
      return {
        ...state,
        loading: false,
        error: action.value,
      };

    case SET_PATH:
      return {
        ...state,
        path: action.value,
      };

    default:
      return state;
  }
};
