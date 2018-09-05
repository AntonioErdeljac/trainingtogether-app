import { validations } from '../../../common/utils';

export default {
  username: value => Promise.resolve(validations.isEmpty(value) ? 'Username is required' : ''),

  email: value => Promise.resolve(validations.isEmpty(value) ? 'Email is required' : ''),

  password: value => Promise.resolve(validations.isEmpty(value) ? 'Password is required' : ''),

  first_name: value => Promise.resolve(validations.isEmpty(value) ? 'First Name is required' : ''),

  last_name: value => Promise.resolve(validations.isEmpty(value) ? 'First Name is required' : ''),

  confirm_password: (value, otherValues) => {
    let error = '';

    if (validations.isEmpty(value) || value !== otherValues.password) {
      error = 'Passwords do not match';
    }

    return Promise.resolve(error);
  },
};
