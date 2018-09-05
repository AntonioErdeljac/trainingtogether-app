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
    this.validations = validations;
  }

  handleRegistration = () => {
    this.handleSubmit()
      .then((canSubmit) => {
        const { values, register, navigation } = this.props;
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

  render() {
    const { isSubmitting } = this.props;
    const { selection } = this.state;

    let selectionContent = (
      <View style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', flexDirection: 'column' }}>
        <TouchableOpacity onPress={() => this.handleSelection('email')} style={styles.registrationButton}>
            <Text style={styles.registrationButtonText}>E-mail registration</Text>
            <Icon type="Entypo" name="mail" style={styles.colorGreen} />
          </TouchableOpacity>
        <TouchableOpacity onPress={() => this.handleSelection('facebook')} style={styles.registrationButton}>
          <Text style={styles.registrationButtonText}>Facebook registration</Text>
          <Icon type="Entypo" name="facebook" style={styles.colorGreen} />
        </TouchableOpacity>
      </View>
    );

    if (selection === 'email') {
      selectionContent = (
        <View style={styles.emailContainer}>
          <Input itemStyle={styles.borderTransparent} style={styles.input} {...this.getFieldProps('email')} label="Email" />
          <Input type="password" itemStyle={styles.borderTransparent} style={styles.input} {...this.getFieldProps('password')} label="Password" />
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
        <Icon type="MaterialCommunityIcons" name="heart-pulse" style={styles.icon}/>
        <Text style={styles.title}>
          TrainingTogether
        </Text>
        {selectionContent}
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
