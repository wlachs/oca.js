import {
  DEFAULT_ROUTE_QUERY_ERROR,
  DEFAULT_ROUTE_QUERY_START, DEFAULT_ROUTE_QUERY_SUCCESS,
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
    case DEFAULT_ROUTE_QUERY_START:
    case ROUTE_QUERY_START:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case DEFAULT_ROUTE_QUERY_SUCCESS:
      return {
        ...state,
        loading: false,
        route: action.value,
        path: action.value.path,
      };

    case ROUTE_QUERY_SUCCESS:
      return {
        ...state,
        loading: false,
        route: action.value,
      };

    case DEFAULT_ROUTE_QUERY_ERROR:
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
