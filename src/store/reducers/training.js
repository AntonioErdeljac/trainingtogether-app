import { get } from 'lodash';
import { actions } from '../../common/constants';

const initialState = {
  data: {},
  hasLoaded: false,
  isLoading: false,
  isSubmitting: false,
};

const actionMap = {
  [actions.TRAINING_CREATE_REQUEST]: state => ({ ...state, isSubmitting: true, }),
  [actions.TRAINING_CREATE_SUCCESS]: (state, { result }) => ({ ...state, isSubmitting: false, data: result.data }),
  [actions.TRAINING_CREATE_FAILURE]: state => ({ ...state, isSubmitting: false }),
};

export default (state = initialState, action) => {
  if (actionMap[action.type]) {
    return actionMap[action.type](state, action);
  }

  return state;
};
