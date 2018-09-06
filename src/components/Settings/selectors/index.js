import { get } from 'lodash';

import { forms } from '../../../common/constants';

export default state => ({
  values: get(state, `forms.data[${forms.SETTINGS}].values`, {}),
  authUser: state.authentication.authData,
  user: state.user.data,
  isSubmitting: state.user.isSubmitting
});