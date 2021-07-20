import {
  DEFAULT_ROUTE_QUERY_ERROR,
  DEFAULT_ROUTE_QUERY_START,
  DEFAULT_ROUTE_QUERY_SUCCESS,
  ROUTE_QUERY_ERROR,
  ROUTE_QUERY_START,
  ROUTE_QUERY_SUCCESS,
  SET_PATH,
} from './action_types';
import routeQuery from '../services/route_query';
import defaultRouteQuery from '../services/default_route_query';

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

export function setPath(value) {
  return (dispatch) => dispatch({
    SET_PATH,
    value,
  });
}
