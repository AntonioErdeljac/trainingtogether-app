import PropTypes from 'prop-types';
import React from 'react';
import { Icon, Item, Picker } from 'native-base';

const Select = (props) => {
  const { options, itemStyle, style, disabled, error, id, isLoading, isSubmitting, isValidating, label, value, onChange } = props;

  return (
    <Item picker style={error ? { ...itemStyle, borderBottomColor: 'red' } : itemStyle} error={!!error}>
      <Picker
        disabled={disabled || isSubmitting || isValidating || isLoading}
        mode="dropdown"
        iosIcon={<Icon name="ios-arrow-down-outline" />}
        style={style}
        placeholder={label}
        placeholderStyle={{ color: '#bfc6ea' }}
        placeholderIconColor="#007aff"
        selectedValue={value}
        onValueChange={text => onChange(text, id)}
      >
        {options.map(option => (<Picker.Item key={option.value} label={option.label} value={option.value} />))}
      </Picker>
    </Item>
  );
};

Select.defaultProps = {
  itemStyle: undefined,
  style: undefined,
  disabled: false,
  error: undefined,
  isLoading: false,
  isSubmitting: false,
  isValidating: false,
  value: '',
};

Select.propTypes = {
  itemStyle: PropTypes.shape({}),
  style: PropTypes.shape({}),
  disabled: PropTypes.bool,
  error: PropTypes.string,
  isLoading: PropTypes.bool,
  isSubmitting: PropTypes.bool,
  isValidating: PropTypes.bool,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default Select;
