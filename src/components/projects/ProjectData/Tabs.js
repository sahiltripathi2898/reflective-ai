import React, { useState, useEffect } from 'react';

import Dates from './dates';
import Spinner from '../../spinner';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Paper } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

import axios from 'axios';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		marginTop: '20px',
		marginLeft: '20px',
		paddingLeft: '0px',
		paddingRight: '0px',
		maxWidth: '800px',
	},
}));

const ProjectHome = (props) => {
	const classes = useStyles();
	const { history } = props;

	const [buttonId, setbuttonId] = useState('1');
	const [btnA, setbtnA] = useState('#4cebeb');
	const [btnB, setbtnB] = useState('#4ccceb');
	const [btnC, setbtnC] = useState('#4ccceb');
	const [btnD, setbtnD] = useState('#4ccceb');
	const [btnE, setbtnE] = useState('#4ccceb');
	// on click #4cebeb
	// #4ccceb

	const [project_name, setName] = useState('');
	const [project_address, setAddress] = useState('');

	const [loading, setLoading] = useState(true);

	/* 	useEffect(() => {
		const timeout = setTimeout(() => {
			setLoading(false);
		}, 2000);

		return () => {
			setLoading(true);
			clearTimeout(timeout);
		};
	}, []); */

	useEffect(() => {
		const data = {
			jwt_token: localStorage.getItem('jwt_token'),
			project_id: localStorage.getItem('projectID'),
			company_id: Number(localStorage.getItem('company_id')),
		};
		axios
			.post('https://api.reflective.ai/project/details', data)
			.then((res) => {
				//console.log(res);
				if (res.data.status_code === 401) {
					window.alert('Session Timed Out ! Please login in again');
					history.push('/');
				}
				setName(res.data.project.project_name);
				setAddress(res.data.project.address);
				setLoading(false);
			})
			.catch((err) => console.log(err));
	}, []);

	function firstBtn() {
		setbuttonId('1');
		setbtnA('#4cebeb');
		setbtnB('#4ccceb');
		setbtnC('#4ccceb');
		setbtnD('#4ccceb');
		setbtnE('#4ccceb');
	}
	function secondBtn() {
		setbuttonId('2');
		setbtnA('#4ccceb');
		setbtnB('#4cebeb');
		setbtnC('#4ccceb');
		setbtnD('#4ccceb');
		setbtnE('#4ccceb');
	}
	function thirdBtn() {
		setbuttonId('3');
		setbtnC('#4cebeb');
		setbtnB('#4ccceb');
		setbtnA('#4ccceb');
		setbtnD('#4ccceb');
		setbtnE('#4ccceb');
	}
	function fourthBtn() {
		setbuttonId('4');
		setbtnD('#4cebeb');
		setbtnC('#4ccceb');
		setbtnB('#4ccceb');
		setbtnA('#4ccceb');
		setbtnE('#4ccceb');
	}
	function fivthBtn() {
		setbuttonId('5');
		setbtnD('#4ccceb');
		setbtnC('#4ccceb');
		setbtnB('#4ccceb');
		setbtnA('#4ccceb');
		setbtnE('#4cebeb');
	}

	if (loading) return <Spinner />;

	return (
		<div style={{ width: '100%' }}>
			<div style={{ marginTop: '85px', marginLeft: '20px', display: 'flex' }}>
				<div>
					<Typography variant="h5" style={{ fontWeight: '600' }}>
						{project_name}
					</Typography>
					<Typography variant="h6">{project_address}</Typography>
				</div>
				<div>
					{/* <Paper
						elevation={8}
						style={{
							height: '80px',
							width: '200px',
							marginLeft: '50px',
							padding: '20px',
							marginBottom: '30px',
						}}
					>
						<Typography></Typography>
						<Typography
							variant="h5"
							style={{
								color: '#36c95e',
								margin: '0px 0px 3px 0px',
								fontWeight: '600',
								textAlign: 'center',
							}}
						>
							Low Risk
						</Typography>
					</Paper> */}
				</div>
			</div>
			<Container className={classes.root}>
				<ButtonGroup
					variant="contained"
					color="primary"
					aria-label="contained primary button group"
				>
					<Button onClick={firstBtn} style={{ backgroundColor: btnA }}>
						Safety Metrics
					</Button>
					<Button onClick={secondBtn} style={{ backgroundColor: btnB }}>
						Incident Visuals
					</Button>
					<Button onClick={thirdBtn} style={{ backgroundColor: btnC }}>
						Project Team
					</Button>
					<Button onClick={fourthBtn} style={{ backgroundColor: btnD }}>
						Hazard Zones
					</Button>
					<Button onClick={fivthBtn} style={{ backgroundColor: btnE }}>
						Hazard Zones 2
					</Button>
				</ButtonGroup>
			</Container>
			<Dates bID={buttonId} />
		</div>
	);
};

export default withRouter(ProjectHome);
