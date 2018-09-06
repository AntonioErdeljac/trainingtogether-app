import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { AsyncStorage, View } from 'react-native';

import actions from '../../../actions';
import { paths } from '../../../common/constants';

class Selection extends React.Component {
  componentDidMount() {
    const { navigation, login } = this.props;

    Promise.all([
      AsyncStorage.getItem('email'),
      AsyncStorage.getItem('password'),
    ])
      .then((items) => {
        if(!items[0] || !items[1]) {
          navigation.navigate('App');
        } else {
          login({ email: items[0], password: items[1] })
            .then(({result}) => {
              AsyncStorage.setItem('token', result.data.authentication.sessionToken)
                .then(() => {
                  navigation.navigate('Authenticated');
                })
            })
        }
      });
  }

  render() {
    return (
      <View />
    );
  }
}

Selection.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
};

export default connect(
  null,
  {
    ...actions.authentication,
  },
)(Selection);
