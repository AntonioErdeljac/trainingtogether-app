import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { AsyncStorage, View } from 'react-native';

import actions from '../../../actions';
import { paths } from '../../../common/constants';

class Selection extends React.Component {
  componentDidMount() {
    const { navigation } = this.props;

    AsyncStorage.getItem('token')
      .then((token) => {
        if (token) {
          navigation.navigate('App');
        } else {
          navigation.navigate('App');
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
    ...actions.user,
  },
)(Selection);
