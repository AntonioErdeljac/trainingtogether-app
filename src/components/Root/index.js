import React from 'react';
import Toast from 'react-native-easy-toast';
import { connect } from 'react-redux';
import { isEqual, isEmpty } from 'lodash';

import selectors from './selectors';

import actions from '../../actions';
import { toastTypes } from '../../common/constants';

class Root extends React.Component {
  constructor() {
    super();

    this.toastRef = React.createRef();
  }

  componentWillReceiveProps(newProps) {
    const { activeToast, clearToastData } = this.props;

    if (!isEqual(activeToast, newProps.activeToast) && !isEmpty(newProps.activeToast)) {
      if (newProps.activeToast.type === toastTypes.SUCCESS) {
        this.toastRef.show('Success', 500, () => {
          clearToastData();
        });
      } else {
        this.toastRef.show('Something went wrong', 500, () => {
          clearToastData();
        });
      }
    }
  }

  render() {
    const { children, activeToast } = this.props;

    return (
    <React.Fragment>
      <Toast
        ref={(ref) => { this.toastRef = ref; }}
        style={{ backgroundColor: !isEmpty(activeToast) && activeToast.type === toastTypes.SUCCESS ? '#1fcf7c' : '#ff2f3e', width: '90%', padding: 15 }}
      />
      {children}
    </React.Fragment>
    );
  }
}

export default connect(
  selectors,
  {
    ...actions.toast
  }
)(Root);