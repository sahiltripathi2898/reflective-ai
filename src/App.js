import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

// File Imports
import Drawer from './components/drawer/drawer'; ////////// Drawer component
import Integration from './components/integrations/Integration';
import ClientInteg from './components/integrations/client-integ/ClientInte';
import ProfileSetting from './components/profile/Settings';
import SignIn from './Login/SignIn';
import Register from './Login/Register';
import ProjectTable from './components/projects/projectTable';
import ResetPassword from './Login/Reset';
import Project from './components/projects/ProjectData/Tabs';
import CanvasDraw from './components/projects/ProjectData/canvas/canvas';
import WorkerTest from './components/projects/ProjectData/test/workertest';

import Protected from './ProtectedRoute';

const useStyles = makeStyles({
	container: {
		display: 'flex',
		backgroundColor: '#f6f9ff',
	},
});

/////////////  Each route has 2 components --- 1 is drawer and the other is the main component (except login , register , reset)

function App() {
	const classes = useStyles();
	return (
		<div className={classes.container}>
			<BrowserRouter>
				<Switch>
					<Route exact path="/">
						<SignIn />
					</Route>
					<Route exact path="/register">
						<Register />
					</Route>
					<Route exact path="/reset">
						<ResetPassword />
					</Route>
					<Route exact path="/home">
						<Protected cmp={<Drawer />} />
					</Route>
					<Route exact path="/home/test">
						<Protected cmp={<Drawer />} />
					</Route>
					<Route exact path="/home/project">
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
					<Route exact path="/home">
						<ProjectTable />
					</Route>
					<Route exact path="/home/test">
						<WorkerTest />
					</Route>
					<Route exact path="/home/project">
						<Project />
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
