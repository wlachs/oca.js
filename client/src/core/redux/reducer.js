import {
  DEFAULT_ROUTE_QUERY_ERROR,
  DEFAULT_ROUTE_QUERY_START,
  DEFAULT_ROUTE_QUERY_SUCCESS, LOGIN_ERROR, LOGIN_START, LOGIN_SUCCESS,
  ROUTE_QUERY_ERROR,
  ROUTE_QUERY_START,
  ROUTE_QUERY_SUCCESS,
  SET_LOADING_STATE,
} from './action_types';

const INITIAL_STATE = {
  loading: null,
  error: null,
  route: null,
  bearer: null,
  navigationTrigger: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_LOADING_STATE:
      return {
        ...state,
        loading: action.value,
      };

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
        navigationTrigger: null,
      };

    case DEFAULT_ROUTE_QUERY_ERROR:
    case ROUTE_QUERY_ERROR:
      return {
        ...state,
        loading: false,
        error: action.value,
      };

    case LOGIN_START:
      return {
        ...state,
        loading: true,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        bearer: action.value.bearer,
        navigationTrigger: action.value.redirect.redirect.path,
      };

    case LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.value,
      };

    default:
      return state;
  }
};
