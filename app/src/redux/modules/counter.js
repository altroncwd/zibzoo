import { createAction, handleActions } from 'redux-actions';
// import { counterState } from '../states/counterState';

// Create action types
// these are just constants the must be in all caps and if the action type is
// more than one word separate with an underscore ex: INCREMENT_COUNTER
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';

// create Actions using createAction
// These functions will create standard flux actions
// standard flux actions are simply objects that must contain an action type and a payload
// the first action creator below will when invoked produce an object like so: { type: "INCREMENT", payload: 1 }
export const increment = createAction(INCREMENT, (value = 1) => value);
export const decrement = createAction(DECREMENT, (value = 1) => value);

// export object containing actions
// this will be imported into the root reducer file
export const actions = {
  increment,
  decrement
};

// create Reducer
export default handleActions({
  [INCREMENT]: (state, { payload }) => state + payload,
  [DECREMENT]: (state, { payload }) => state - payload
}, 1);
