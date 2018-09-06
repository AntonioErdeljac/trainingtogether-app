import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { omit, merge } from 'lodash';
import { StatusBar, Image, Text, View, TouchableOpacity, AsyncStorage, ImageBackground, Dimensions } from 'react-native';
import { Container, Content, Form as NativeForm, Icon } from 'native-base';

import selectors from './selectors';
import validations from './validations';

import styles from '../common/styles';

import { UppercasedText, Input, Form } from '../../common/components';

import actions from '../../../actions';
import images from '../../../static/images';
import { paths, forms } from '../../../common/constants';

class Login extends Form {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      validating: {},
      selection: undefined,
    };

    this.formId = forms.LOGIN;
    this.validations = validations;
  }

  handleRegistration = () => {
    this.handleSubmit()
      .then((canSubmit) => {
        const { values, login, navigation } = this.props;
        if (canSubmit) {
          login(values)
              .then(({ result }) => {
                Promise.all([
                  AsyncStorage.setItem('email', values.email),
                  AsyncStorage.setItem('password', values.password),
                  AsyncStorage.setItem('token', result.data.authentication.sessionToken),
                ])
                  .then(() => {
                    navigation.navigate('Authenticated');
                  })
              });
        }
        return canSubmit;
      });
  }

  render() {
    const { isSubmitting, navigation } = this.props;

    return (
      <React.Fragment>
        <StatusBar hidden />
        <ImageBackground
        source={images.bg}
        style={styles.backgroundImageSize}
        imageStyle={styles.backgroundImageStyle}
      >
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={images.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>
          TrainingTogether
        </Text>
        <View style={styles.emailContainer}>
          <Input itemStyle={styles.borderTransparent} style={styles.input} {...this.getFieldProps('email')} label="Email" />
          <Input type="password" itemStyle={styles.borderTransparent} style={styles.input} {...this.getFieldProps('password')} label="Password" />
          <TouchableOpacity onPress={this.handleRegistration} style={styles.registrationButton}>
            <Text style={styles.registrationButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate(paths.client.Registration)}>
          <Text style={{ paddingTop: 10, paddingBottom: 10, fontSize: 15, color: '#fff', fontFamily: 'Nunito-Light', textAlign: 'center' }} >I don't have an account</Text>
        </TouchableOpacity>
      </View>
        </ImageBackground>
      </React.Fragment>
    );
  }
}

Login.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
};

export default connect(
  selectors,
  {
    ...actions.forms,
    ...actions.authentication,
  },
)(Login);
