import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { StatusBar, View, Text, Image, ImageBackground, TouchableOpacity, KeyboardAvoidingView, Keyboard, AsyncStorage } from 'react-native';

import selectors from './selectors';
import validations from './validations';

import styles from '../common/styles';

import { Input, Form } from '../../common/components';

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
      showLogo: true,
      validating: {},
      errors: {},
    };

    this.formId = forms.LOGIN;
    this.validations = validations;
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.hideLogo);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.showLogo);
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  hideLogo = () => {
    this.setState({
      showLogo: false,
    });
  }

  showLogo = () => {
    this.setState({
      showLogo: true,
    });
  }

  handleLogin = () => {
    this.handleSubmit()
      .then((canSubmit) => {
        const { values, login, navigation } = this.props;
        if (canSubmit) {
          login(values)
            .then(({ result }) => {
              AsyncStorage.setItem('token', result.data.key)
                .then(() => navigation.navigate(paths.client.TeamsSelection));
            });
        }
        return canSubmit;
      });
  }

  render() {
    const { navigation, values, isSubmitting } = this.props;
    const { showLogo } = this.state;

    const logoContent = showLogo
      ? (
        <View style={styles.headerContainer}>
          <Image
            style={styles.logoWelcome}
            source={images.logo}
            resizeMode="contain"
          />
        </View>
      )
      : null;

    return (
      <ImageBackground
        source={images.authBg4}
        style={styles.backgroundImageSize}
        imageStyle={styles.backgroundImageStyle}
      >
        <StatusBar />
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <KeyboardAvoidingView keyboardVerticalOffset={0} style={styles.avoidingView} behavior="padding">
              {logoContent}
              <View style={styles.flexContainer}>
                <Input
                  itemStyle={styles.itemEmail}
                  {...this.getFieldProps('email')}
                  label="Email address"
                  labelStyle={styles.inputLabel}
                  style={styles.input}
                />
                <Input
                  itemStyle={styles.itemPassword}
                  {...this.getFieldProps('password')}
                  label="Password"
                  labelStyle={styles.inputLabel}
                  type="password"
                  style={styles.input}
                />
                <View />
                <View style={styles.forgotPasswordContainer}>
                  <Text style={styles.forgotPassword}>
                    Forgot your password?
                  </Text>
                </View>
              </View>
              <View style={showLogo ? styles.buttonContainer : styles.buttonContainerKeyboard}>
                <TouchableOpacity disabled={!(values.email && values.password) || isSubmitting} onPress={this.handleLogin} style={values.email && values.password ? styles.reverseSubmitButton : styles.submitButton}>
                  <Text style={styles.submitButtonText}>
                    Log in
                  </Text>
                </TouchableOpacity>
                <Text style={styles.subeading2Login}>
                  Don&#39;t have a BallerProfile?&nbsp;
                  <Text onPress={() => navigation.navigate(paths.client.Registration)} style={styles.loginLink}>
                    Sign me up
                  </Text>
                </Text>
              </View>
            </KeyboardAvoidingView>
          </View>
        </View>
      </ImageBackground>
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
