import {
  ROUTE_QUERY_ERROR, ROUTE_QUERY_START, ROUTE_QUERY_SUCCESS, SET_PATH,
} from './action_types';
import routeQuery from '../services/route_query';

export function getRoute() {
  return (dispatch) => {
    /* Start route query */
    dispatch({
      type: ROUTE_QUERY_START,
    });

    routeQuery()
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
