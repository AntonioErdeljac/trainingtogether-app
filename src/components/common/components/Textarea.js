import PropTypes from 'prop-types';
import React from 'react';
import { Textarea as NativeTextarea, Icon, Label, Item } from 'native-base';

class Textarea extends React.Component {
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
    const { rows, itemStyle, labelStyle, addon, style, disabled, error, id, isLoading, isSubmitting, isValidating, label, type, value, onChange } = this.props;
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
        <NativeTextarea
          placeholder={label}
          style={error ? { ...style, borderColor: '#ef4836', borderWidth: 0.5, borderStyle: 'solid' } : style}
          disabled={disabled || isValidating || isSubmitting || isLoading}
          id={id}
          value={value}
          rowSpan={rows}
          onChangeText={text => onChange(text, id)}
          selectionColor="#fff"
          secureTextEntry={!showPassword && type === 'password'}
        />
      </Item>
    );
  }
}

Textarea.defaultProps = {
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
  rows: 4,
};

Textarea.propTypes = {
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
  rows: PropTypes.number,
};

export default Textarea;
