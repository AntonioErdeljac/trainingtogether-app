import { get, cloneDeep, set, filter } from 'lodash';

import { actions } from '../../common/constants';

const initialState = {
  data: {},
};

const actionMap = {
  [actions.FORM_UPDATE_VALUES]: (state, { values, formId }) => ({
    ...set(cloneDeep(state), `data.${formId}.values`, values),
  }),

  [actions.FORM_UPDATE_FIELD_VALUE]: (state, { field, value, formId }) => ({
    ...set(cloneDeep(state), `data.${formId}.values.${field}`, value),
  }),

  [actions.FORM_PUSH_VALUES]: (state, { field, values, formId }) => ({
    ...set(cloneDeep(state), `data.${formId}.values.${field}`, get(state, `data.${formId}.values.${field}`, []).concat(cloneDeep(values))),
  }),

  [actions.FORM_REMOVE_VALUES]: (state, { field, index, formId }) => ({
    ...set(cloneDeep(state), `data.${formId}.values.${field}`, filter(get(state, `data.${formId}.values.${field}`, []), (x, key) => key !== index)),
  }),
};

export default (state = initialState, action) => {
  if (actionMap[action.type]) {
    return actionMap[action.type](state, action);
  }

  return state;
};
