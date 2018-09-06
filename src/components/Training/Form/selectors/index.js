import { get } from 'lodash';

import { forms } from '../../../../common/constants';

export default state => ({
  values: get(state, `forms.data[${forms.TRAINING}].values`, {}),
  training: state.training.data,
  isSubmitting: state.training.isSubmitting
});