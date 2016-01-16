import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import CounterView from './src/views/components/counterView';
import CoreLayout from './src/views/core-layout/coreLayout';

export default (
  <Route path="/" component= { CoreLayout } >
    <IndexRoute component={ CounterView } />
    <Redirect from="*" to="/" />

  </Route>
);
