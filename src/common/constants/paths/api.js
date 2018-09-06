import { serverUrl } from '../config';

export default {
  AUTHENTICATION_LOGIN: `${serverUrl}/api/v1/authentication/login`,
  AUTHENTICATION_REGISTER: `${serverUrl}/api/v1/authentication/registration`,
  TRAININGS: `${serverUrl}/api/v1/trainings`,
  USERS_ID: `${serverUrl}/api/v1/users/:id`,
};
