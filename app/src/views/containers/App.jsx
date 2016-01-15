import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import CounterView from '../components/counterView';
import DevTools from './devTools/devTools';

export default class App extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  };
  render() {
    return (
      <Provider store={this.props.store}>
        <div>
          <CounterView />
          <DevTools/>
        </div>
      </Provider>
    );
  }
}
