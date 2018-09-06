import { get } from 'lodash';
import { actions } from '../../common/constants';

const initialState = {
  data: {},
  hasLoaded: false,
  isLoading: false,
  isSubmitting: false,
};

const actionMap = {
  [actions.USER_GET_REQUEST]: state => ({ ...state, hasLoaded: false, isLoading: true }),
  [actions.USER_GET_SUCCESS]: (state, { result }) => ({ ...state, hasLoaded: true, isLoading: false, data: result.data }),
  [actions.USER_GET_FAILURE]: state => ({ ...state, hasLoaded: false, isLoading: false }),

  [actions.USER_UPDATE_REQUEST]: state => ({ ...state, isSubmitting: true, }),
  [actions.USER_UPDATE_SUCCESS]: (state, { result }) => ({ ...state, isSubmitting: false, data: result.data }),
  [actions.USER_UPDATE_FAILURE]: state => ({ ...state, isSubmitting: false }),
};

export default (state = initialState, action) => {
  if (actionMap[action.type]) {
    return actionMap[action.type](state, action);
  }

  return state;
};
