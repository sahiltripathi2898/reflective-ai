import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
//import { Divider, Button, ButtonGroup, Container } from '@material-ui/core';
import axios from 'axios';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import Spinner from '../../spinner';
import { withRouter } from 'react-router-dom';

//Resposive text
import {
	createMuiTheme,
	responsiveFontSizes,
	ThemeProvider,
} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		width: '100%',
	},
	paper: {
		padding: theme.spacing(1),
		textAlign: 'center',
		color: theme.palette.text.secondary,
		height: '290px',
		borderRadius: '10px',
	},
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paperModal: {
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		width: '70%',
		height: '650px',
		borderRadius: '10px',
	},
	bg: {
		marginTop: '20px',
		paddingLeft: '0px',
		paddingRight: '0px',
		maxWidth: '100%',
		display: 'block',
		textAlign: 'right',
	},
}));

const Visual = (props) => {
	const classes = useStyles();
	const [buttonId, setbuttonId] = useState('1');
	/* 	const [btnA, setbtnA] = useState('#4cebeb');
	const [btnB, setbtnB] = useState('#2c387e');
	const [btnC, setbtnC] = useState('#2c387e');
	const [btnD, setbtnD] = useState('#2c387e');

	function firstBtn() {
		setbuttonId('1');
		setbtnA('#4cebeb');
		setbtnB('#2c387e');
		setbtnC('#2c387e');
		setbtnD('#2c387e');
	}
	function secondBtn() {
		setbuttonId('2');
		setbtnA('#2c387e');
		setbtnB('#4cebeb');
		setbtnC('#2c387e');
		setbtnD('#2c387e');
	}
	function thirdBtn() {
		setbuttonId('3');
		setbtnC('#4cebeb');
		setbtnB('#2c387e');
		setbtnA('#2c387e');
		setbtnD('#2c387e');
	}
	function fourthBtn() {
		setbuttonId('4');
		setbtnC('#2c387e');
		setbtnB('#2c387e');
		setbtnA('#2c387e');
		setbtnD('#4cebeb');
	} */

	const { cID, sDate, eDate, history } = props;
	/*   console.log(cID)
    console.log(sDate)
    console.log(eDate) */

	const [loading, setLoading] = useState(true);

	/* 	useEffect(() => {
		const timeout = setTimeout(() => {
			setLoading(false);
		}, 1500);

		return () => {
			setLoading(true);
			clearTimeout(timeout);
		};
	}, [cID, sDate, eDate]); */

	useEffect(() => {
		setLoading(true);
	}, [cID, sDate, eDate]);

	var startDate = sDate.toISOString().slice(0, 10) + ' 00:00:00';
	var endDate = eDate.toISOString().slice(0, 10) + ' 23:00:00';

	// Arrays
	const [hats, setHat] = useState([]);
	const [phys, setPhy] = useState([]);
	const [masks, setMask] = useState([]);
	const [vests, setVest] = useState([]);

	useEffect(() => {
		const data = {
			jwt_token: localStorage.getItem('jwt_token'),
			project_id: Number(localStorage.getItem('projectID')),
			camera_id: cID,
			start_date: startDate,
			end_date: endDate,
			company_id: Number(localStorage.getItem('company_id')),
		};
		//console.log(data);
		axios
			.post(
				'http://ec2-52-53-227-112.us-west-1.compute.amazonaws.com/camera/videos',
				data
			)
			.then((res) => {
				if (res.data.status_code === 401) {
					window.alert('Token has expired ! Please login in again');
					history.push('/');
				}
				//console.log(res.data);
				setHat(res.data.hard_hat);
				setPhy(res.data.physical_distancing);
				setMask(res.data.mask);
				setVest(res.data.viz_vest);
				//setVisual(res.data);
				setLoading(false);
			})
			.catch((err) => console.log(err));
	}, [cID, sDate, eDate]);

	/* 	useEffect(() => {
		if (phys.length > 0) {
			console.log('1');
			firstBtn();
		} else if (masks.length > 0) {
			console.log('2');
			secondBtn();
		} else if (hats.length > 0) {
			console.log('3');
			thirdBtn();
		} else if (vests.length > 0) {
			console.log('4');
			fourthBtn();
		}
	}, [cID, sDate, eDate]); */

	const [open, setOpen] = React.useState(false);
	const [modalVideo, setModalVideo] = useState('');
	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	if (loading) return <Spinner />;

	return (
		<div>
			{hats.length === 0 &&
			phys.length === 0 &&
			masks.length === 0 &&
			vests.length === 0 ? (
				<div>
					<Typography
						variant="h4"
						style={{
							textAlign: 'center',
							marginTop: '50px',
							fontWeight: '600',
						}}
					>
						No Observation
					</Typography>
				</div>
			) : (
				<Grid container style={{ marginBottom: '50px', marginTop: '15px' }}>
					<ThemeProvider theme={theme}>
						<Grid item lg={5} xs={12}>
							<div
								style={{
									marginBottom: '5px',
									fontFamily: 'Roboto , sans-serif',
									fontWeight: '600',
									fontSize: '36px',
								}}
							>
								Incident Visuals
							</div>
							<div
								style={{
									height: '9px',
									width: '310px',
									backgroundColor: '#179CD5',
									borderRadius: '10px',
									marginBottom: '25px',
								}}
							></div>
						</Grid>
						{/* <Grid item lg={7} xs={12}>
							<Container className={classes.bg}>
								<ButtonGroup
									variant="contained"
									color="primary"
									aria-label="contained primary button group"
									style={{ float: 'none' }}
								>
									{phys.length > 0 && (
										<Button
											onClick={firstBtn}
											style={{ backgroundColor: btnA }}
										>
											Physical Distancing
										</Button>
									)}
									{masks.length > 0 && (
										<Button
											onClick={secondBtn}
											style={{ backgroundColor: btnB }}
										>
											Mask Violations
										</Button>
									)}
									{hats.length > 0 && (
										<Button
											onClick={thirdBtn}
											style={{ backgroundColor: btnC }}
										>
											Hard Hat Violations
										</Button>
									)}
									{vests.length > 0 && (
										<Button
											onClick={fourthBtn}
											style={{ backgroundColor: btnD }}
										>
											Vest Violations
										</Button>
									)}
								</ButtonGroup>
							</Container>
						</Grid> */}
						<Grid container spacing={3}>
							{phys.length > 0 && buttonId === '1' && (
								<div style={{ paddingLeft: '20px' }}>
									<Grid item xs={12}>
										<Typography
											variant="h5"
											style={{ marginTop: '40px', fontWeight: '600' }}
										>
											Physical Distancing Violations
										</Typography>
									</Grid>
									<Grid container spacing={2}>
										{phys.map((phy, index) => (
											<Grid
												item
												lg={4}
												sm={6}
												style={{ textAlign: 'center', marginTop: '20px' }}
												key={index}
											>
												<Paper className={classes.paper} elevation={5}>
													<video
														width="98%"
														height="235"
														controls={true}
														poster={
															'http://ec2-52-53-227-112.us-west-1.compute.amazonaws.com/media' +
															phy.thumbnail_path
														}
														onClick={() => {
															handleOpen();
															setModalVideo(
																'http://ec2-52-53-227-112.us-west-1.compute.amazonaws.com/media' +
																	phy.data_path
															);
														}}
														style={{ outline: 'none', cursor: 'pointer' }}
													>
														<source
															src={
																'http://ec2-52-53-227-112.us-west-1.compute.amazonaws.com/media' +
																phy.data_path
															}
														/>
													</video>
													<Typography variant="h6">
														{phy.datetime.substring(0, 25)}
													</Typography>
												</Paper>
											</Grid>
										))}
									</Grid>
								</div>
							)}
							{masks.length > 0 && buttonId === '1' && (
								<div style={{ paddingLeft: '20px', paddingRight: '10px' }}>
									<Grid item xs={12}>
										<Typography
											variant="h5"
											style={{ marginTop: '40px', fontWeight: '600' }}
										>
											Mask Violations
										</Typography>
									</Grid>
									<Grid container spacing={2}>
										{masks.map((mask, index) => (
											<Grid
												item
												lg={4}
												sm={6}
												style={{ textAlign: 'center', marginTop: '20px' }}
												key={index}
											>
												<Paper className={classes.paper} elevation={5}>
													<video
														width="98%"
														height="235"
														controls={true}
														poster={
															'http://ec2-52-53-227-112.us-west-1.compute.amazonaws.com/media' +
															mask.thumbnail_path
														}
														onClick={() => {
															handleOpen();
															setModalVideo(
																'http://ec2-52-53-227-112.us-west-1.compute.amazonaws.com/media' +
																	mask.data_path
															);
														}}
														style={{ outline: 'none', cursor: 'pointer' }}
													>
														<source
															src={
																'http://ec2-52-53-227-112.us-west-1.compute.amazonaws.com/media' +
																mask.data_path
															}
														/>
													</video>
													<Typography variant="h6">
														{mask.datetime.substring(0, 25)}
													</Typography>
												</Paper>
											</Grid>
										))}
									</Grid>
								</div>
							)}
							{hats.length > 0 && buttonId === '1' && (
								<div style={{ paddingLeft: '20px' }}>
									<Grid item xs={12}>
										<Typography
											variant="h5"
											style={{ marginTop: '40px', fontWeight: '600' }}
										>
											PPE Compliance - Hard Hat (Violations)
										</Typography>
									</Grid>
									<Grid container spacing={2}>
										{hats.map((hat, index) => (
											<Grid
												item
												lg={4}
												sm={6}
												style={{ textAlign: 'center', marginTop: '20px' }}
												key={index}
											>
												<Paper className={classes.paper} elevation={5}>
													<video
														width="98%"
														height="235"
														controls={true}
														poster={
															'http://ec2-52-53-227-112.us-west-1.compute.amazonaws.com/media' +
															hat.thumbnail_path
														}
														onClick={() => {
															handleOpen();
															setModalVideo(
																'http://ec2-52-53-227-112.us-west-1.compute.amazonaws.com/media' +
																	hat.data_path
															);
														}}
														style={{ outline: 'none', cursor: 'pointer' }}
													>
														<source
															src={
																'http://ec2-52-53-227-112.us-west-1.compute.amazonaws.com/media' +
																hat.data_path
															}
														/>
													</video>
													<Typography variant="h6">
														{hat.datetime.substring(0, 25)}
													</Typography>
												</Paper>
											</Grid>
										))}
									</Grid>
								</div>
							)}
							{vests.length > 0 && buttonId === '1' && (
								<div style={{ paddingLeft: '20px' }}>
									<Grid item xs={12}>
										<Typography
											variant="h5"
											style={{ marginTop: '40px', fontWeight: '600' }}
										>
											PPE Compliance - High Viz Vest (Violations)
										</Typography>
									</Grid>
									<Grid container spacing={2}>
										{vests.map((vest, index) => (
											<Grid
												item
												lg={4}
												sm={6}
												style={{ textAlign: 'center', marginTop: '20px' }}
												key={index}
											>
												<Paper className={classes.paper} elevation={5}>
													<video
														width="98%"
														height="235"
														controls={true}
														poster={
															'http://ec2-52-53-227-112.us-west-1.compute.amazonaws.com/media' +
															vest.thumbnail_path
														}
														onClick={() => {
															handleOpen();
															setModalVideo(
																'http://ec2-52-53-227-112.us-west-1.compute.amazonaws.com/media' +
																	vest.data_path
															);
														}}
														style={{ outline: 'none', cursor: 'pointer' }}
													>
														<source
															src={
																'http://ec2-52-53-227-112.us-west-1.compute.amazonaws.com/media' +
																vest.data_path
															}
														/>
													</video>
													<Typography variant="h6">
														{vest.datetime.substring(0, 25)}
													</Typography>
												</Paper>
											</Grid>
										))}
									</Grid>
								</div>
							)}
						</Grid>
					</ThemeProvider>
					<Modal
						aria-labelledby="transition-modal-title"
						aria-describedby="transition-modal-description"
						className={classes.modal}
						open={open}
						onClose={handleClose}
						closeAfterTransition
						BackdropComponent={Backdrop}
						BackdropProps={{
							timeout: 500,
						}}
					>
						<Fade in={open}>
							<div className={classes.paperModal} style={{ outline: 'none' }}>
								<video
									width="100%"
									height="90%"
									controls={true}
									style={{ marginTop: '30px', outline: 'none' }}
								>
									<source src={modalVideo} />
								</video>
							</div>
						</Fade>
					</Modal>
				</Grid>
			)}
		</div>
	);
};

export default withRouter(Visual);
