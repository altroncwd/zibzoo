import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { actions as counterActions } from '../../redux/modules/counter';

const mapStateToProps = (state) => ({
  counter: state.counter
});

export class CounterView extends React.Component {
  static propTypes = {
    counter: PropTypes.number.isRequired,
    increment: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired
  };

  render() {
    const handleIncrement = () => this.props.increment();
    const handleDecrement = () => this.props.decrement();
    return (
      <div>
        <h1>{this.props.counter}</h1>
        <button onClick={handleIncrement}>increment</button>
        <button onClick={handleDecrement}>decrement</button>
      </div>
    );
  }
}

export default connect(mapStateToProps, counterActions)(CounterView);
