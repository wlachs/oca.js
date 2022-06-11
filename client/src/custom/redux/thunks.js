import { SET_LOADING_STATE, SHOW_ALERT } from '../../core/redux/action_types';
import customListQuery from '../network/custom_list_query';
import { ERROR_ALERT_TYPE } from '../../core/components/AlertMessage';
import { SET_CUSTOM_STATE } from './action_types';
import { CUSTOM_LIST } from './paths';

// eslint-disable-next-line import/prefer-default-export
export function getCustomList(modelKey) {
  return async (dispatch) => {
    dispatch({
      type: SET_LOADING_STATE,
      value: true,
    });

    try {
      const data = await customListQuery(modelKey);
      dispatch({
        type: SET_CUSTOM_STATE,
        path: CUSTOM_LIST,
        value: data,
      });
    } catch (e) {
      dispatch({
        type: SHOW_ALERT,
        alertType: ERROR_ALERT_TYPE,
        value: e,
      });
    } finally {
      dispatch({
        type: SET_LOADING_STATE,
        value: false,
      });
    }
  };
}
