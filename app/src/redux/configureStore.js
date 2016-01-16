import thunk from 'redux-thunk';
import rootReducer from './rootReducer';
import DevTools from '../views/containers/devTools/devTools';
import {
  applyMiddleware,
  compose,
  createStore
} from 'redux';

export default function configureStore(initialState) {
  let createStoreWithMiddleware;
  const middleware = applyMiddleware(thunk);

  createStoreWithMiddleware = compose(middleware, DevTools.instrument());

  const store = createStoreWithMiddleware(createStore)(
    rootReducer, initialState
    );
  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      const nextRootReducer = require('./rootReducer').default;

      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}
