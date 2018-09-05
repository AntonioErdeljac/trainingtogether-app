import axios from 'axios';
import { AsyncStorage } from 'react-native';

import { actions } from '../common/constants';

export default () => ({ dispatch, getState }) => next => (action) => {
  if (typeof action === 'function') {
    return action(dispatch, getState);
  }

  const callAPIAction = action[actions.API_CALL];

  if (typeof callAPIAction === 'undefined' || !callAPIAction.promise) {
    return next(action);
  }

  const { promise, types, ...restParams } = callAPIAction;
  const [REQUEST, SUCCESS, FAILURE] = types;

  next({ ...restParams, type: REQUEST });

  return AsyncStorage.getItem('token')
    .then(token => promise(axios.create(token && { headers: { Authorization: `Token ${token}` } }), dispatch)
      .then(
        result => next({ ...restParams, result, type: SUCCESS }),
        (error) => {
          next({ ...restParams, error, type: FAILURE });
          return Promise.reject(error);
        },
      ));
};
