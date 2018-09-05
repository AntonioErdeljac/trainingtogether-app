import api from './api';
import client from './client';

export default {
  build: (path, ...params) => {
    params.reverse();
    return path.replace(/(:\w+)/g, () => params.pop());
  },
  api,
  client,
};
