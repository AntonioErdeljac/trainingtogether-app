import DatePicker from 'react-native-datepicker'
import React from 'react';
import { View, Dimensions, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { isEmpty, isEqual, merge } from 'lodash';
import { withNavigationFocus } from 'react-navigation-is-focused-hoc';

import selectors from './selectors';
import styles from './styles';

import { Input, Form, Textarea } from '../../common/components';

import actions from '../../../actions';
import { forms, paths } from '../../../common/constants'

class TrainingForm extends Form {
  constructor() {
    super();

    this.state = {
      errors: {},
      validating: {},
      time: undefined
    };

    this.formId = forms.TRAINING;
  }

  componentWillReceiveProps(newProps) {
    const { isFocused, clearTrainingData, setValues } = this.props;

    if (isFocused && !newProps.isFocused) {
      clearTrainingData();
      setValues({}, this.formId);
      this.setState({
        errors: {},
        validating: {},
        time: undefined
      })
    }
  }

  handleSave = () => {
    this.handleSubmit()
      .then((canSubmit) => {
        if (canSubmit) {
          const { values, createTraining, navigation } = this.props;
          const { time } = this.state;

          createTraining(merge(values))
            .then(() => navigation.navigate(paths.client.Trainings))
        }
        return canSubmit;
      })
  }

  render() {
    const { isSubmitting } = this.props;
    const { time } = this.state;

    return (
      <View style={{ marginTop: 35, flex: 1, display: 'flex', justifyContent: 'space-between', alignSelf: 'center', alignItems: 'center', width: Dimensions.get('window').width - 35, }}>
        <Text style={{ fontFamily: 'Poppins-Bold', alignSelf: 'flex-start', textAlign: 'left', fontSize: 35, color: '#1fcf7c' }}>New Training</Text>
        <View style={{ display: 'flex', justifyContent: 'center', alignSelf: 'center', alignItems: 'center', }}>
          <Input itemStyle={styles.borderLess} style={styles.input} {...this.getFieldProps('title')} label="Title" />
          <Input itemStyle={styles.borderLess} style={styles.input} {...this.getFieldProps('place')} label="Place" />
          <DatePicker
            style={{ width: Dimensions.get('window').width - 35, alignItems: 'center', display: 'flex', justifyContent: 'flex-start' }}
            date={time}
            mode="time"
            placeholder="Time"
            format="HH:mm"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            showIcon={false}
            customStyles={{
              dateInput: styles.input,
              dateText: {
                fontFamily: 'Nunito-Regular',
                fontSize: 16,
                color: 'rgba(0,0,0,.8)'
              },
              placeholderText: {
                fontFamily: 'Nunito-Regular',
                fontSize: 16,
                color: 'rgba(0,0,0,.8)'
              }
            }}
            onDateChange={(time) => { this.setState({time: time}) }}
          />
          <Textarea itemStyle={styles.borderLess} style={styles.input} {...this.getFieldProps('description')} label="Description" />
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
