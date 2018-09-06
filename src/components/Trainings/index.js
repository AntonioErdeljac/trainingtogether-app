import React from 'react';
import { View, Text, Dimensions, ActivityIndicator } from 'react-native';
import { withNavigationFocus } from 'react-navigation-is-focused-hoc';
import { connect } from 'react-redux';

import selectors from './selectors';

import actions from '../../actions';

class Trainings extends React.Component {
  componentDidMount() {
    const { getTrainings } = this.props;

    getTrainings();
  }

  componentWillReceiveProps(newProps) {
    const { isFocused, clearTrainingsData, getTrainings } = this.props;

    if (!isFocused && newProps.isFocused) {
      getTrainings();
    }
    if (isFocused && !newProps.isFocused) {
      clearTrainingsData();
    }
  }

  render() {
    const { trainings, isLoading, hasLoaded } = this.props;

    let content = <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}><ActivityIndicator size="large" /></View>;

    if(!isLoading && hasLoaded) {
      content = (
        <React.Fragment>
          {trainings.map((training) => {
            return (
              <View key={training._id} style={{ width: '100%' , borderRadius: 5, elevation: 0.5, marginTop: 5, marginBottom: 5 }}>
                <View style={{ padding: 15, }}>
                  <Text style={{ fontSize: 16, fontFamily: 'Nunito-SemiBold' }}>{training.title}</Text>
                </View>
              </View>
            )
          })}
        </React.Fragment>
      )
    }

    return (
     <View style={{ marginTop: 35, width: Dimensions.get('window').width - 35, display: 'flex', alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
     <Text style={{ fontFamily: 'Poppins-Bold', alignSelf: 'flex-start', textAlign: 'left', fontSize: 35, color: '#1fcf7c' }}>All Trainings</Text>
      {content}
     </View>
    )
  }
}

export default connect(
  selectors,
  {
    ...actions.trainings
  }
)(withNavigationFocus(Trainings));