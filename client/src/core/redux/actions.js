import {
  DEFAULT_ROUTE_QUERY_ERROR,
  DEFAULT_ROUTE_QUERY_START,
  DEFAULT_ROUTE_QUERY_SUCCESS,
  ROUTE_QUERY_ERROR,
  ROUTE_QUERY_START,
  ROUTE_QUERY_SUCCESS,
  SET_LOADING_STATE,
  LOGIN_ERROR,
  LOGIN_START,
  LOGIN_SUCCESS,
} from './action_types';
import defaultRouteQuery from '../network/default_route_query';
import routeQuery from '../network/route_query';
import authentication from '../network/authentication';

export function setLoadingState(state) {
  return (dispatch) => dispatch({
    type: SET_LOADING_STATE,
    value: state,
  });
}

export function getDefaultRoute() {
  return (dispatch) => {
    /* Start route query */
    dispatch({
      type: DEFAULT_ROUTE_QUERY_START,
    });

    defaultRouteQuery()
      /* Route query successful */
      .then((value) => dispatch({
        type: DEFAULT_ROUTE_QUERY_SUCCESS,
        value,
      }))

      /* Route query failed */
      .catch((value) => dispatch({
        type: DEFAULT_ROUTE_QUERY_ERROR,
        value,
      }));
  };
}

export function getRoute(path) {
  return (dispatch) => {
    /* Start route query */
    dispatch({
      type: ROUTE_QUERY_START,
    });

    routeQuery(path)
      /* Route query successful */
      .then((value) => dispatch({
        type: ROUTE_QUERY_SUCCESS,
        value,
      }))

      /* Route query failed */
      .catch((value) => dispatch({
        type: ROUTE_QUERY_ERROR,
        value,
      }));
  };
}

export function login(userID, password) {
  return (dispatch, getState) => {
    const state = getState();

    /* Start login request */
    dispatch({
      type: LOGIN_START,
    });

    authentication(userID, password, state.core.route.path)
      /* Login successful */
      .then((value) => dispatch({
        type: LOGIN_SUCCESS,
        value,
      }))

      /* Login failed */
      .catch((value) => {
        dispatch({
          type: LOGIN_ERROR,
          value,
        });
      });
  };
}
