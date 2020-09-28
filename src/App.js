import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

// File Imports
import Drawer from './components/drawer';
import Home from './components/home';

function App() {
  return (
    <Router>
      <Route exact path="/">
        <Drawer />
      </Route>
    </Router>
  );
}

export default App;
