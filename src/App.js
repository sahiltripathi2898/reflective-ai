import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// File Imports
import Drawer from './components/drawer';

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
