import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

// File Imports
import Drawer from './components/drawer';
import Integration from './components/integrations/Integration';
import ClientInteg from './components/integrations/client-integ/ClientInte';
import ProfileSetting from './components/profile/Settings';
import SignIn from './Login/SignIn';
import Register from './Login/Register';
import Projects from './components/projects/projectTable';
import ResetPassword from './Login/Reset'

import Protected from './ProtectedRoute';

const useStyles = makeStyles({
  container: {
    display: 'flex',
  },
});

function App() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/login">
            <SignIn />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/reset">
            <ResetPassword />
          </Route>
          <Route exact path="/">
            <Protected cmp={<Drawer />} />
          </Route>
          <Route exact path="/integration">
            <Protected cmp={<Drawer />} />
          </Route>
          <Route exact path="/integration/client">
            <Protected cmp={<Drawer />} />
          </Route>
          <Route exact path="/profile-setting">
            <Protected cmp={<Drawer />} />
          </Route>
        </Switch>

        <Switch>
          <Route exact path="/">
            <Projects />
          </Route>
          <Route exact path="/integration">
            <Integration />
          </Route>
          <Route exact path="/integration/client">
            <ClientInteg />
          </Route>
          <Route exact path="/profile-setting">
            <ProfileSetting />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
