import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './Navigation';
import Routes from './Routes';

import './App.css';

const App = () => (
  <Router>
    <div className="main-grid">
      <Navigation className="header" />
      <Routes className="content" />
    </div>
  </Router>
);

export default App;
