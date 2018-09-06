import React from 'react';
import { View, Dimensions, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import { isEmpty, isEqual } from 'lodash';

import selectors from './selectors';
import styles from './styles';

import { Input, Form } from '../../common/components';

import actions from '../../../actions';
import { forms } from '../../../common/constants'

class TrainingForm extends Form {
  constructor() {
    super();

    this.state = {
      errors: {},
      validating: {},
    };

    this.formId = forms.TRAINING;
  }

  handleSave = () => {
    this.handleSubmit()
      .then((canSubmit) => {
        if (canSubmit) {
          const { values, createTraining } = this.props;

          createTraining(values);
        }
        return canSubmit;
      })
  }

  render() {
    return (
      <View style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignSelf: 'center', alignItems: 'center', width: Dimensions.get('window').width - 35, }}>
        <View style={{ display: 'flex', justifyContent: 'center', alignSelf: 'center', alignItems: 'center', }}>
          <Input itemStyle={styles.borderLess} style={styles.input} {...this.getFieldProps('title')} label="Title" />
        </View>
        <TouchableOpacity onPress={this.handleSave} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Create</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default connect(
  selectors,
  {
    ...actions.forms,
    ...actions.training,
  }
)(TrainingForm);
