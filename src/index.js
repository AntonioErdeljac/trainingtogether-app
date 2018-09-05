import React from 'react';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import { Welcome, Authentication, Teams, Profiles } from './components';
import { initialRoute } from './common/constants';
import { reducers, middleware } from './store';

const AppRouter = createStackNavigator({
  Login: Authentication.Login,
  Registration: Authentication.Registration,
}, {
  initialRouteName: 'Registration',
});


const InitialRouter = createSwitchNavigator({
  RouterSelection: Authentication.Selection,
  App: AppRouter,
}, {
  initialRouteName: 'RouterSelection',
});

const store = createStore(reducers, applyMiddleware(thunk, middleware()));

const App = () => (
  <Provider store={store}>
    <InitialRouter />
  </Provider>
);

export default App;
