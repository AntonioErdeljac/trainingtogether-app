import { serverUrl } from '../config';

export default {
  AUTHENTICATION_LOGIN: `${serverUrl}/api/auth/login/`,
  AUTHENTICATION_REGISTER: `${serverUrl}/api/register/`,
  LEAGUES: `${serverUrl}/api/leagues`,
  NATIONS: `${serverUrl}/api/nations`,
  PLAYERS_ID: `${serverUrl}/api/players/:id`,
  TEAMS: `${serverUrl}/api/teams`,
  TEAMS_CREATE: `${serverUrl}/api/teams`,
  TEAMS_ID: `${serverUrl}/api/teams/:id`,
  TEAMS_ID_PLAYERS: `${serverUrl}/api/teams/:id/players/`,
  USERS_ID: `${serverUrl}/api/users/:id`,
  USER_AUTH: `${serverUrl}/api/auth/user`,
  RELATIONSHIPS: `${serverUrl}/api/relationships/`,
  PLAYERS_SINGLE: `${serverUrl}/api/players`,
  REQUESTS: `${serverUrl}/api/requests/`,
};
