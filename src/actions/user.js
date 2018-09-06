import { actions, paths } from '../common/constants';

export default {
  getUser: id => ({
    [actions.API_CALL]: {
      types: [
        actions.USER_GET_REQUEST,
        actions.USER_GET_SUCCESS,
        actions.USER_GET_FAILURE,
      ],
      promise: client => client.get(paths.build(paths.api.USERS_ID, id)),
    },
  }),

  updateUser: (values, id) => ({
    [actions.API_CALL]: {
      types: [
        actions.USER_UPDATE_REQUEST,
        actions.USER_UPDATE_SUCCESS,
        actions.USER_UPDATE_FAILURE,
      ],
      promise: client => client.put(paths.build(paths.api.USERS_ID, id), values),
    },
  }),

  clearUserData: () => ({ type: actions.USER_DATA_RESET }),
};
