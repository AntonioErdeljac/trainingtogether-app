import React from 'react';
import { createStackNavigator, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { Icon } from 'native-base';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { updateFocus } from 'react-navigation-is-focused-hoc';

import { Authentication, Trainings, Settings, Training, Root } from './components';
import { initialRoute } from './common/constants';
import { reducers, middleware } from './store';

const AppRouter = createStackNavigator({
  Login: Authentication.Login,
  Registration: Authentication.Registration,
}, {
  initialRouteName: 'Registration',
});

const AuthenticatedRouter = createBottomTabNavigator({
  Trainings,
  TrainingForm: Training.Form,
  Settings,
},
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Trainings') {
          iconName = `home`;
        } else if (routeName === 'Settings') {
          iconName = 'settings';
        } else if (routeName === 'TrainingForm') {
          iconName = 'edit';
        }

        return <Icon name={iconName} type="Feather" size={25} style={focused ? {color: '#1fcf7c'} : {color: 'gray'}} />;
      },
    }),
    resetOnBlur: true,
    backBehavior: 'Home',
    tabBarOptions: {
      swipeEnabled: true,
      animationEnabled: true,
      activeTintColor: '#ff2f3e',
      inactiveTintColor: 'gray',
      showLabel: false,
      style: {
        backgroundColor: '#fff',
        borderWidth: 0,
        borderColor: '#fff'
      },
    },
  },
{
  initialRouteName: 'Trainings',
});


const InitialRouter = createSwitchNavigator({
  RouterSelection: Authentication.Selection,
  App: AppRouter,
  Authenticated: AuthenticatedRouter,
}, {
  initialRouteName: 'RouterSelection',
});

const store = createStore(reducers, applyMiddleware(thunk, middleware()));

const App = () => (
  <Provider store={store}>
    <Root>
      <InitialRouter
        onNavigationStateChange={(prevState, currentState) => {
          updateFocus(currentState)
        }}
      />
    </Root>
  </Provider>
);

export default App;
