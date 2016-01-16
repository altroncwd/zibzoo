import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import CounterView from './src/views/components/counterView';
import HelloRoutes from './src/views/components/HelloRoutes';
import CoreLayout from './src/views/core-layout/coreLayout';

export default (
  <Route path="/" component= { CoreLayout } >
    <IndexRoute component={ CounterView } />
    <Route path="/hello" component={ HelloRoutes } />
    <Redirect from="*" to="/" />

  </Route>
);
