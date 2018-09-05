import PropTypes from 'prop-types';
import React from 'react';
import { Input as NativeInput, Icon, Label, Item } from 'native-base';

class Input extends React.Component {
  constructor() {
    super();

    this.state = {
      showPassword: false,
    };
  }

  toggleShowPassword = () => {
    const { showPassword } = this.state;

    this.setState({
      showPassword: !showPassword,
    });
  }

  render() {
    const { itemStyle, labelStyle, addon, style, disabled, error, id, isLoading, isSubmitting, isValidating, label, type, value, onChange } = this.props;
    const { showPassword } = this.state;

    let inputAddon;

    if (type === 'password') {
      inputAddon = <Icon onPress={this.toggleShowPassword} type="FontAwesome" name={showPassword ? 'eye-slash' : 'eye'} />;
    } else if (addon) {
      inputAddon = addon;
    }

    if (error) {
      inputAddon = <Icon name="close-o" type="EvilIcons" />;
    }

    return (
      <Item style={itemStyle} error={!!error}>
        <NativeInput
          placeholder={label}
          style={error ? { ...style, borderColor: '#ef4836', borderWidth: 0.5, borderStyle: 'solid' } : style}
          disabled={disabled || isValidating || isSubmitting || isLoading}
          id={id}
          value={value}
          onChangeText={text => onChange(text, id)}
          selectionColor="#fff"
          secureTextEntry={!showPassword && type === 'password'}
        />
      </Item>
    );
  }
}

Input.defaultProps = {
  itemStyle: undefined,
  labelStyle: undefined,
  style: undefined,
  addon: undefined,
  disabled: false,
  error: undefined,
  isLoading: false,
  isSubmitting: false,
  isValidating: false,
  type: 'text',
  value: '',
};

Input.propTypes = {
  itemStyle: PropTypes.shape({}),
  labelStyle: PropTypes.shape({}),
  style: PropTypes.shape({}),
  addon: PropTypes.element,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  isLoading: PropTypes.bool,
  isSubmitting: PropTypes.bool,
  isValidating: PropTypes.bool,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default Input;
