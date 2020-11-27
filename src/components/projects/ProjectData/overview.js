import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Typography, Divider, Grid } from '@material-ui/core';
import axios from 'axios';

import Spinner from '../../spinner';

import { withRouter } from 'react-router-dom';

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 16,
	},
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
	root: {
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.action.hover,
		},
	},
}))(TableRow);

const useStyles = makeStyles({
	table: {
		minWidth: '100%',
	},
});

const Overview = (props) => {
	const { history } = props;
	const classes = useStyles();

	const [loading, setLoading] = useState(true);

	/* 	useEffect(() => {
		const timeout = setTimeout(() => {
			setLoading(false);
		}, 1000);

		return () => {
			setLoading(true);
			clearTimeout(timeout);
		};
	}, []); */

	const [team, setTeam] = useState([]);

	useEffect(() => {
		const data = {
			jwt_token: localStorage.getItem('jwt_token'),
			company_id: localStorage.getItem('company_id'),
			project_id: localStorage.getItem('projectID'),
		};
		//console.log(data);
		axios
			.post(
				'http://ec2-52-53-227-112.us-west-1.compute.amazonaws.com/project/team',
				data
			)
			.then((res) => {
				if (res.data.status_code === 401) {
					window.alert('Session Timed Out ! Please login in again');
					history.push('/');
				}
				//console.log(res.data);
				setTeam(res.data.team);
				//setRows(res.data.projects);
				setLoading(false);
			})
			.catch((err) => console.log(err));
	}, []);

	/*  const [projects, setProjects] = useState([])
   
   useEffect(() => {
     const data = {
       jwt_token: localStorage.getItem('jwt_token'),
       company_id: localStorage.getItem('companyID'),
       project_id: localStorage.getItem('productID')
     };
     axios
       .post(
         ' http://ec2-13-56-161-17.us-west-1.compute.amazonaws.com:7789/project/team',
         data
       )
       .then((res) => {
         console.log(res.data)
         setTeam(res.data.team)
         //setRows(res.data.projects);
       })
       .catch((err) => console.log(err));
   }, []); */

	if (loading) return <Spinner />;

	return (
		<Grid container style={{ padding: '0px' }}>
			{/*<Grid item xs={12}
        style={{
          marginBottom: '30px',
          marginTop: '20px',
          fontFamily: 'Quicksand , sans-serif',
          fontSize: '36px',
        }}
      >
        Projects Overview
      </Grid>*/}
			<Grid item xs={12}>
				<Typography variant="h6" style={{ marginBottom: '10px' }}>
					PROJECT TEAM
				</Typography>
			</Grid>
			<Grid item xs={12}>
				<TableContainer component={Paper}>
					<Table className={classes.table} aria-label="customized table">
						<TableHead>
							<TableRow>
								<StyledTableCell>Role</StyledTableCell>
								<StyledTableCell align="left">Name</StyledTableCell>
								<StyledTableCell align="left">Email ID</StyledTableCell>
								<StyledTableCell align="left">Mobile</StyledTableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{team.map((member, index) => (
								<StyledTableRow key={member[0]}>
									<StyledTableCell component="th" scope="row">
										{member[4]}
									</StyledTableCell>
									<StyledTableCell align="left">
										{member[0] + ' ' + member[1]}
									</StyledTableCell>
									<StyledTableCell align="left">{member[2]}</StyledTableCell>
									<StyledTableCell align="left">{member[3]}</StyledTableCell>
								</StyledTableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Grid>
			<Grid item xs={12}>
				<Divider style={{ marginTop: '30px', marginBottom: '30px' }} />
			</Grid>
			<Grid item xs={12}>
				<Typography variant="h6" style={{ marginBottom: '10px' }}>
					OPEN ISSUES
				</Typography>
			</Grid>
			<Grid item xs={12}>
				<TableContainer component={Paper}>
					<Table className={classes.table} aria-label="customized table">
						<TableHead>
							<TableRow>
								<StyledTableCell>Issue Type</StyledTableCell>
								<StyledTableCell align="left">Description</StyledTableCell>
								<StyledTableCell align="left">Status</StyledTableCell>
								<StyledTableCell align="left">Created Date</StyledTableCell>
								<StyledTableCell align="left">Due Date</StyledTableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							<StyledTableRow>
								<StyledTableCell component="th" scope="row">
									No Open Issues
								</StyledTableCell>
								<StyledTableCell align="left"></StyledTableCell>
								<StyledTableCell align="left"></StyledTableCell>
								<StyledTableCell align="left"></StyledTableCell>
								<StyledTableCell align="left"></StyledTableCell>
							</StyledTableRow>
						</TableBody>
					</Table>
				</TableContainer>
			</Grid>
			<Grid item xs={12}>
				<Divider style={{ marginTop: '30px', marginBottom: '30px' }} />
			</Grid>
		</Grid>
	);
};

export default withRouter(Overview);
