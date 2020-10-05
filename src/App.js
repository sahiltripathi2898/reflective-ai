import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

// File Imports
import Drawer from './components/drawer';
import Dashboard from './components/dashboard/Dashboard';
import Chart from './components/charts/Charts';
import Integration from './components/integrations/Integration';
import Alert from './components/alerts/alert';
import ClientInteg from './components/integrations/client-integ/ClientInte';
import ProfileSetting from './components/profile/Settings';

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
        <Drawer />
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route exact path="/alert">
            <Alert />
          </Route>
          <Route exact path="/chart">
            <Chart />
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
