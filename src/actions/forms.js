import { actions } from '../common/constants';

export default {
  setValues: (values, formId) => ({ type: actions.FORM_UPDATE_VALUES, values, formId }),

  updateField: (field, value, formId) => ({ type: actions.FORM_UPDATE_FIELD_VALUE, field, value, formId }),

  pushValues: (field, values, formId) => ({ type: actions.FORM_PUSH_VALUES, field, values, formId }),

  removeValues: (field, index, formId) => ({ type: actions.FORM_REMOVE_VALUES, field, index, formId }),
};
