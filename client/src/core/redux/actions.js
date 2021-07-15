import {
  INIT_ERROR, INIT_START, INIT_SUCCESS, SET_LOADING_STATE,
} from './action_types';
import initialize from '../services/init';

export function setLoadingState(state) {
  return (dispatch) => dispatch({
    type: SET_LOADING_STATE,
    value: state,
  });
}

export function init() {
  return (dispatch) => {
    /* Start initialization */
    dispatch({
      type: INIT_START,
    });

    initialize()
      /* Initialization successful */
      .then((value) => dispatch({
        type: INIT_SUCCESS,
        value,
      }))

      /* Initialization failed */
      .catch((value) => dispatch({
        type: INIT_ERROR,
        value,
      }));
  };
}
