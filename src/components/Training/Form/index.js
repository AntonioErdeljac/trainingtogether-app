import React from 'react';
import { View, Dimensions, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { withNavigationFocus } from 'react-navigation-is-focused-hoc';
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

  componentWillReceiveProps(newProps) {
    const { isFocused, clearTrainingData, setValues } = this.props;

    if (isFocused && !newProps.isFocused) {
      clearTrainingData();
      setValues({}, this.formId);
    }
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
    const { isSubmitting } = this.props;

    return (
      <View style={{ marginTop: 35, flex: 1, display: 'flex', justifyContent: 'space-between', alignSelf: 'center', alignItems: 'center', width: Dimensions.get('window').width - 35, }}>
        <Text style={{ fontFamily: 'Poppins-Bold', alignSelf: 'flex-start', textAlign: 'left', fontSize: 35, color: '#1fcf7c' }}>New Training</Text>
        <View style={{ display: 'flex', justifyContent: 'center', alignSelf: 'center', alignItems: 'center', }}>
          <Input itemStyle={styles.borderLess} style={styles.input} {...this.getFieldProps('title')} label="Title" />
        </View>
        <TouchableOpacity onPress={this.handleSave} style={styles.submitButton}>
        {isSubmitting
              ? <ActivityIndicator size="small" color="#fff" />
              : <Text style={styles.submitButtonText}>Create</Text>
            }
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
)(withNavigationFocus(TrainingForm));
