// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import App from './App';

type Props = {
  store: Store,
  history: {}
};

export default class Root extends Component<Props> {
  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store}>
        <App history={history} />
      </Provider>
    );
  }
}
