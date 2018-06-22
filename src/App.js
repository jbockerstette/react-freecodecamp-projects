import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './navigation/Navigation';
import Routes from './routes/Routes';

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
