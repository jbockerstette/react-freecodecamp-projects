import React from 'react';
import { Route } from 'react-router-dom';
import RandomQuoteMachine from './RandomQuoteMachine';

const Routes = ({ className }) => (
  <div className={className}>
    <Route path="/random-quote-machine" component={RandomQuoteMachine} />
  </div>
);

export default Routes;
