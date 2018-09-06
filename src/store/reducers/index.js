import { combineReducers } from 'redux';

import authentication from './authentication';
import forms from './forms';
import toast from './toast';
import training from './training';
import trainings from './trainings';
import user from './user';

export default combineReducers({
  authentication,
  forms,
  toast,
  training,
  trainings,
  user,
});
