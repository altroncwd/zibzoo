import { createAction, handleActions } from 'redux-actions';
// import { counterState } from '../states/counterState';


// create Constants
// Action Types
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';

// create Actions
export const increment = createAction(INCREMENT, (value = 1) => value);
export const decrement = createAction(DECREMENT, (value = 1) => value);

// export object containing actions
export const actions = {
  increment,
  decrement
};

// create Reducer
export default handleActions({
  [INCREMENT]: (state, { payload }) => state + payload,
  [DECREMENT]: (state, { payload }) => state - payload
}, 1);
