import React from 'react';
import { View, Dimensions, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { withNavigationFocus } from 'react-navigation-is-focused-hoc';
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
    const { isFocused, clearUserData, getUser, authUser, user, setValues } = this.props;

    if(!isEqual(newProps.user, user)) {
      setValues(newProps.user, this.formId);
    }

    if (!isFocused && newProps.isFocused) {
      getUser(authUser._id);
    }
    if (isFocused && !newProps.isFocused) {
      setValues({}, this.formId);
      clearUserData();
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
    const { isLoading, hasLoaded, isSubmitting } = this.props;

    let content = <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}><ActivityIndicator size="large" /></View>;

    if(!isLoading && hasLoaded) {
      content = (
        <React.Fragment>
          <View style={{ display: 'flex', justifyContent: 'center', alignSelf: 'center', alignItems: 'center', }}>
            <Input itemStyle={styles.borderLess} style={styles.input} {...this.getFieldProps('personal.firstName')} label="First name" />
            <Input itemStyle={styles.borderLess} style={styles.input} {...this.getFieldProps('personal.lastName')} label="Last name" />
          </View>
          <TouchableOpacity onPress={this.handleSave} style={styles.submitButton}>
            {isSubmitting
              ? <ActivityIndicator size="small" color="#fff" />
              : <Text style={styles.submitButtonText}>Save</Text>
            }
          </TouchableOpacity>
        </React.Fragment>
      );
    }

    return (
      <View style={{ marginTop: 35, flex: 1, display: 'flex', justifyContent: 'space-between', alignSelf: 'center', alignItems: 'center', width: Dimensions.get('window').width - 35, }}>
        <Text style={{ fontFamily: 'Poppins-Bold', alignSelf: 'flex-start', textAlign: 'left', fontSize: 35, color: '#1fcf7c' }}>Settings</Text>
        {content}
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
)(withNavigationFocus(Settings));
