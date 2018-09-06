import { get } from 'lodash';
import { actions } from '../../common/constants';

const initialState = {
  data: [],
  hasLoaded: false,
  isLoading: false,
};

const actionMap = {
  [actions.TRAININGS_GET_REQUEST]: state => ({ ...state, hasLoaded: false, isLoading: true }),
  [actions.TRAININGS_GET_SUCCESS]: (state, { result }) => ({ ...state, hasLoaded: true, isLoading: false, data: result.data.data }),
  [actions.TRAININGS_GET_FAILURE]: state => ({ ...state, hasLoaded: false, isLoading: false }),

  [actions.TRAININGS_DATA_RESET]: () => ({ ...initialState }),
};

export default (state = initialState, action) => {
  if (actionMap[action.type]) {
    return actionMap[action.type](state, action);
  }

  return state;
};
