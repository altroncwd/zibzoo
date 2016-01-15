import React from 'react';
import ReactDOM from 'react-dom';
import App from './src/views/components/App';

// comment the following two lines out for deployment
const app = document.createElement('div');
document.body.appendChild(app);
ReactDOM.render(<App />, app);
