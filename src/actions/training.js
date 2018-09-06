import { actions, paths } from '../common/constants';

export default {
  createTraining: values => ({
    [actions.API_CALL]: {
      types: [
        actions.TRAINING_CREATE_REQUEST,
        actions.TRAINING_CREATE_SUCCESS,
        actions.TRAINING_CREATE_FAILURE,
      ],
      promise: client => client.post(paths.api.TRAININGS, values),
    },
  }),

  clearTrainingData: () => ({ type: actions.TRAINING_DATA_RESET }),
};
