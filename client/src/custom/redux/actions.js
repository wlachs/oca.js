import { PROJECT_LIST_QUERY_ERROR, PROJECT_LIST_QUERY_START, PROJECT_LIST_QUERY_SUCCESS } from './action_types';
import projectListQuery from '../network/project_list_query';

// eslint-disable-next-line import/prefer-default-export
export function getProjectList() {
  return (dispatch) => {
    /* Start project list query */
    dispatch({
      type: PROJECT_LIST_QUERY_START,
    });

    projectListQuery()
      /* Project list query successful */
      .then((value) => dispatch({
        type: PROJECT_LIST_QUERY_SUCCESS,
        value,
      }))

      /* Project list query failed */
      .catch((value) => dispatch({
        type: PROJECT_LIST_QUERY_ERROR,
        value,
      }));
  };
}
