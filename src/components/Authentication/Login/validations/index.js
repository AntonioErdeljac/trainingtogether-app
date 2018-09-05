import { validations } from '../../../common/utils';

export default {
  email: value => Promise.resolve(validations.isEmpty(value) ? 'Email is required' : ''),

  password: value => Promise.resolve(validations.isEmpty(value) ? 'Password is required' : ''),
};
