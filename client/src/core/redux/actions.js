import { INIT_START, INIT_SUCCESS, SET_LOADING_STATE } from './action_types';

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

    /* Finish initialization */
    dispatch({
      type: INIT_SUCCESS,
    });
  };
}
