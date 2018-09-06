import { actions, paths } from '../common/constants';

export default {
  getTrainings: () => ({
    [actions.API_CALL]: {
      types: [
        actions.TRAININGS_GET_REQUEST,
        actions.TRAININGS_GET_SUCCESS,
        actions.TRAININGS_GET_FAILURE,
      ],
      promise: client => client.get(paths.api.TRAININGS),
    },
  }),

  clearTrainingsData: () => ({ type: actions.TRAININGS_DATA_RESET }),
};
