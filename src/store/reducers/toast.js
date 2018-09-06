import { get } from 'lodash';

import { actions, toastTypes } from '../../common/constants';

const initialState = {
  data: {},
};

const actionMap = {
  [actions.TOAST_SUCCESS]: state => ({ ...state, data: { type: toastTypes.SUCCESS }, }),
  [actions.TOAST_FAILURE]: state => ({ ...state, data: { type: toastTypes.FAILURE }, }),

  [actions.TOAST_DATA_RESET]: () => ({ ...initialState }),
};

export default (state = initialState, action) => {
  if (actionMap[action.type]) {
    return actionMap[action.type](state, action);
  }

  return state;
};
