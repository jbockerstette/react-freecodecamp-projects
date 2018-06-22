import React from 'react';
import { Route } from 'react-router-dom';
import routeConfig from './routeConfig';

const Routes = ({ className }) => (
  <div className={className}>
    {routeConfig.map(route => (
      <Route key={route.path} path={route.path} component={route.component} />
    ))}
  </div>
);

export default Routes;
