import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { connect } from 'react-redux';

import selectors from './selectors';

import actions from '../../actions';

class Trainings extends React.Component {
  componentDidMount() {
    const { getTrainings } = this.props;

    getTrainings();
  }

  render() {
    const { trainings } = this.props;

    return (
     <View style={{ marginTop: 35, width: Dimensions.get('window').width - 35, display: 'flex', alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
       {trainings.map((training) => {
         return (
          <View key={training._id} style={{ width: '100%' , borderRadius: 5, elevation: 0.5 }}>
            <View style={{ padding: 15, }}>
              <Text>{training.title}</Text>
            </View>
          </View>
        )
        })}
     </View>
    )
  }
}

export default connect(
  selectors,
  {
    ...actions.trainings
  }
)(Trainings);