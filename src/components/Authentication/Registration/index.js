import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { omit, merge } from 'lodash';
import { StatusBar, Image, Text, View, TouchableOpacity, AsyncStorage, ImageBackground, Dimensions } from 'react-native';
import { Container, Content, Form as NativeForm, Icon } from 'native-base';
import { LoginButton, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

import selectors from './selectors';
import validations from './validations';

import styles from '../common/styles';

import { UppercasedText, Input, Form } from '../../common/components';

import actions from '../../../actions';
import images from '../../../static/images';
import { paths, forms } from '../../../common/constants';

class Registration extends Form {
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

    this.formId = forms.REGISTRATION;
  }

  handleRegistration = () => {
    this.handleSubmit()
      .then((canSubmit) => {
        const { values, register, navigation } = this.props;
        const { selection } = this.state;

        if (canSubmit) {
          register(values)
            .then(() => navigation.navigate(paths.client.Login))
        }
        return canSubmit;
      });
  }

  handleSelection = (selection) => {
    this.setState({
      selection
    })
  }

  handleFacebookCallback = (error, result) => {
    const { updateField } = this.props;

    if (error) {
      this.handleSelection();
    } else {
      updateField('personal.firstName', result.name.split(' ')[0], this.formId);
      updateField('personal.lastName', result.name.split(' ')[1], this.formId);
      updateField('contact.email', result.email, this.formId);
      this.handleSelection('facebook');
    }
  }

  handleFBLogin = (error, result) => {
    const { updateField } = this.props;

    if (error) {
      this.handleSelection();
    } else if (result.isCancelled) {
      this.handleSelection();
    } else {
      AccessToken.getCurrentAccessToken().then(
        (data) => {
          updateField('authentication.facebookAccessToken', data.accessToken.toString(), this.formId);

          const infoRequest = new GraphRequest(
            paths.facebook.me,
            null,
            this.handleFacebookCallback
          );
          new GraphRequestManager().addRequest(infoRequest).start();
        }
      )
    }
  }

  render() {
    const { isSubmitting, navigation, updateField } = this.props;
    const { selection } = this.state;

    let selectionContent = (
      <View style={styles.selectionContainer}>
        <TouchableOpacity onPress={() => this.handleSelection('email')} style={styles.registrationButton}>
            <Text style={styles.registrationButtonText}>E-mail registration</Text>
            <Icon type="Entypo" name="mail" style={styles.colorGreen} />
          </TouchableOpacity>
        <LoginButton
          readPermissions={["email", "user_friends", "public_profile"]}
          onLoginFinished={this.handleFBLogin}
        />
      </View>
    );

    if (selection === 'email') {
      selectionContent = (
        <View style={styles.emailContainer}>
          <Input itemStyle={styles.borderTransparent} style={styles.input} {...this.getFieldProps('contact.email')} label="Email" />
          <Input type="password" itemStyle={styles.borderTransparent} style={styles.input} {...this.getFieldProps('authentication.password')} label="Password" />
          <TouchableOpacity onPress={this.handleRegistration} style={styles.registrationButton}>
            <Text style={styles.registrationButtonText}>Register</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (selection === 'facebook') {
      selectionContent = (
        <View style={styles.emailContainer}>
          <Input itemStyle={styles.borderTransparent} style={styles.input} {...this.getFieldProps('contact.email')} label="Email" disabled />
          <Input type="password" itemStyle={styles.borderTransparent} style={styles.input} {...this.getFieldProps('authentication.password')} label="Password" />
          <TouchableOpacity onPress={this.handleRegistration} style={styles.registrationButton}>
            <Text style={styles.registrationButtonText}>Register</Text>
          </TouchableOpacity>
        </View>
      );
    }

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
        {selectionContent}
        <TouchableOpacity onPress={() => navigation.navigate(paths.client.Login)}>
          <Text style={styles.secondaryText} >I already have an account</Text>
        </TouchableOpacity>
      </View>
        </ImageBackground>
      </React.Fragment>
    );
  }
}

Registration.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
};

export default connect(
  selectors,
  {
    ...actions.forms,
    ...actions.authentication,
  },
)(Registration);
