import {
  CLEAR_ALERT,
  DEFAULT_ROUTE_QUERY_ERROR,
  DEFAULT_ROUTE_QUERY_START,
  DEFAULT_ROUTE_QUERY_SUCCESS,
  LOGIN_ERROR,
  LOGIN_START,
  LOGIN_SUCCESS,
  ROUTE_QUERY_ERROR,
  ROUTE_QUERY_START,
  ROUTE_QUERY_SUCCESS,
  SET_LOADING_STATE,
  SHOW_ALERT,
} from './action_types';
import { ERROR_ALERT_TYPE } from '../components/AlertMessage';

const INITIAL_STATE = {
  loading: null,
  alert: null,
  route: null,
  bearer: null,
};

function populateAlert(message, type) {
  return {
    message,
    type,
  };
}

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
        alert: null,
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
        alert: populateAlert(action.value.message, ERROR_ALERT_TYPE),
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
      };

    case LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        alert: populateAlert(action.value.message, ERROR_ALERT_TYPE),
      };

    case SHOW_ALERT:
      return {
        ...state,
        alert: populateAlert(action.message, action.alertType),
      };

    case CLEAR_ALERT:
      return {
        ...state,
        alert: null,
      };

    default:
      return state;
  }
};
