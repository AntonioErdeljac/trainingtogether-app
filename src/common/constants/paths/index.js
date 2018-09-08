import api from './api';
import client from './client';
import facebook from './facebook';

export default {
  build: (path, ...params) => {
    params.reverse();
    return path.replace(/(:\w+)/g, () => params.pop());
  },
  api,
  client,
  facebook,
};
