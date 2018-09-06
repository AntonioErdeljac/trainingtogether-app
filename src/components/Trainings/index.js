import React from 'react';
import { View, Text, Dimensions, ActivityIndicator } from 'react-native';
import { withNavigationFocus } from 'react-navigation-is-focused-hoc';
import { Icon } from 'native-base';
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
              <View key={training._id} style={{ width: '100%' , borderRadius: 5, elevation: 0.5, marginTop: 10, marginBottom: 10 }}>
                <View style={{ padding: 15, }}>
                  <Text style={{ fontSize: 20, fontFamily: 'Nunito-SemiBold', marginBottom: 15, }}>{training.title}</Text>
                  <Text style={{ fontSize: 14, fontFamily: 'Nunito-Regular', color: 'rgba(0,0,0,.4)' }}>{training.description}</Text>
                </View>
                <View style={{ padding: 15, display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', marginTop: 10, borderTopWidth: 0.2, borderColor: 'rgba(0,0,0,.2)' }}>
                  <Icon style={{ color: '#1fcf7c', fontSize: 15 }} name="map-pin" type="Feather" />
                  <Text style={{ fontSize: 15, fontFamily: 'Nunito-SemiBold', paddingLeft: 10, }}>{training.place}</Text>
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