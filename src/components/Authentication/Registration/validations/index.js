import { validations } from '../../../common/utils';

export default {
  'contact.email': value => Promise.resolve(validations.isEmpty(value) ? 'Email is required' : ''),

  'authentication.password': value => Promise.resolve(validations.isEmpty(value) ? 'Password is required' : ''),
};
