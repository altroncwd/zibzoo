import React from 'react';
import ReactDOM from 'react-dom';
import App from './src/views/containers/App';
import configureStore from './src/redux/configureStore';

// comment the following two lines out for deployment
const store = configureStore(window.__INITIAL_STATE__);

const app = document.createElement('div');
document.body.appendChild(app);
ReactDOM.render(<App store={store} />, app);
