import React from 'react';
import { View, Dimensions, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import { isEmpty, isEqual } from 'lodash';

import selectors from './selectors';
import styles from './styles';

import { Input, Form } from '../common/components';

import actions from '../../actions';
import { forms } from '../../common/constants'

class Settings extends Form {
  constructor() {
    super();

    this.state = {
      errors: {},
      validating: {},
    };

    this.formId = forms.SETTINGS;
  }

  componentDidMount() {
    const { getUser, authUser } = this.props;

    getUser(authUser._id);
  }

  componentWillReceiveProps(newProps) {
    const { setValues, user } = this.props;

    if(!isEqual(newProps.user, user)) {
      setValues(newProps.user, this.formId);
    }
  }

  handleSave = () => {
    this.handleSubmit()
      .then((canSubmit) => {
        if (canSubmit) {
          const { values, updateUser, authUser } = this.props;

          updateUser(values, authUser._id);
        }
        return canSubmit;
      })
  }

  render() {
    return (
      <View style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignSelf: 'center', alignItems: 'center', width: Dimensions.get('window').width - 35, }}>
        <View style={{ display: 'flex', justifyContent: 'center', alignSelf: 'center', alignItems: 'center', }}>
          <Input itemStyle={styles.borderLess} style={styles.input} {...this.getFieldProps('personal.firstName')} label="First name" />
          <Input itemStyle={styles.borderLess} style={styles.input} {...this.getFieldProps('personal.lastName')} label="Last name" />
        </View>
        <TouchableOpacity onPress={this.handleSave} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default connect(
  selectors,
  {
    ...actions.forms,
    ...actions.user,
    ...actions.authentication,
  }
)(Settings);
