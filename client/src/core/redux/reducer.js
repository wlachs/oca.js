import {
  INIT_ERROR, INIT_START, INIT_SUCCESS, SET_LOADING_STATE,
} from './action_types';

const INITIAL_STATE = {
  loading: true,
  error: null,
  defaultRoute: '/',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_LOADING_STATE:
      return {
        ...state,
        loading: action.value,
      };

    case INIT_START:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case INIT_SUCCESS:
      return {
        ...state,
        loading: false,
        defaultRoute: action.value,
      };

    case INIT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.value,
      };

    default:
      return state;
  }
};
