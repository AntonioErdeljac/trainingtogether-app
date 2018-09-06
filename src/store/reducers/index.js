import { combineReducers } from 'redux';

import authentication from './authentication';
import forms from './forms';
import training from './training';
import trainings from './trainings';
import user from './user';

export default combineReducers({
  authentication,
  forms,
  training,
  trainings,
  user,
});
