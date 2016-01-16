import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';
import VendorsList from './src/views/containers/VendorsList';
import CoreLayout from './src/views/core-layout/CoreLayout';

export default (
  <Route path="/" component= { CoreLayout } >
    <IndexRoute component={ VendorsList } />
    <Redirect from="*" to="/" />
  </Route>
);
