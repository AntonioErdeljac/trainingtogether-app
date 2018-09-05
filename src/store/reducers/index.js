import { combineReducers } from 'redux';

import authentication from './authentication';
import forms from './forms';

export default combineReducers({
  authentication,
  forms,
});
