import {
  ROUTE_QUERY_ERROR,
  ROUTE_QUERY_START,
  ROUTE_QUERY_SUCCESS,
  SET_LOADING_STATE,
  LOGIN_ERROR,
  LOGIN_START,
  LOGIN_SUCCESS,
  CLEAR_ALERT,
  SHOW_ALERT,
  LOGIN_CLEAR,
} from './action_types';
import routeQuery from '../network/route_query';
import authentication from '../network/authentication';

export function setLoadingState(state) {
  return (dispatch) => dispatch({
    type: SET_LOADING_STATE,
    value: state,
  });
}

export function getRoute(path) {
  return async (dispatch, getState) => {
    /* Get current state for auth header */
    const { core } = getState();

    /* Start route query */
    await dispatch({
      type: ROUTE_QUERY_START,
    });

    try {
      const route = await routeQuery(path, core.bearer);
      /* Route query successful */
      await dispatch({
        type: ROUTE_QUERY_SUCCESS,
        value: route,
      });
    } catch (e) {
      /* Route query failed */
      await dispatch({
        type: ROUTE_QUERY_ERROR,
        value: e,
      });

      /* Clear invalid login data */
      await dispatch({
        type: LOGIN_CLEAR,
      });

      await getRoute(path)(dispatch, getState);
    }
  };
}

export function login(userID, password, navigate) {
  return (dispatch, getState) => {
    const state = getState();

    /* Start login request */
    dispatch({
      type: LOGIN_START,
    });

    authentication(userID, password, state.core.route.path)
      /* Login successful */
      .then((value) => {
        dispatch({
          type: LOGIN_SUCCESS,
          value,
        });

        /* Redirect after login */
        navigate(value.redirect.redirect.path);
      })

      /* Login failed */
      .catch((value) => {
        dispatch({
          type: LOGIN_ERROR,
          value,
        });
      });
  };
}

export function showAlert(message, alertType) {
  return (dispatch) => dispatch({
    type: SHOW_ALERT,
    message,
    alertType,
  });
}

export function clearAlert() {
  return (dispatch) => dispatch({
    type: CLEAR_ALERT,
  });
}
