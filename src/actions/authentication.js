import { actions, paths } from '../common/constants';

export default {
  register: data => ({
    [actions.API_CALL]: {
      types: [
        actions.AUTHENTICATION_REGISTRATION_REQUEST,
        actions.AUTHENTICATION_REGISTRATION_SUCCESS,
        actions.AUTHENTICATION_REGISTRATION_FAILURE,
      ],
      promise: client => client.post(paths.api.AUTHENTICATION_REGISTER, data),
    },
  }),

  login: data => ({
    [actions.API_CALL]: {
      types: [
        actions.AUTHENTICATION_LOGIN_REQUEST,
        actions.AUTHENTICATION_LOGIN_SUCCESS,
        actions.AUTHENTICATION_LOGIN_FAILURE,
      ],
      promise: client => client.post(paths.api.AUTHENTICATION_LOGIN, data),
    },
  }),
};
