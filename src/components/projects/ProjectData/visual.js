import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Divider } from '@material-ui/core';
import axios from 'axios';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import Spinner from '../../spinner';

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
}));

export default function Visual(props) {
	const classes = useStyles();

	const { cID, sDate, eDate } = props;
	/*   console.log(cID)
    console.log(sDate)
    console.log(eDate) */

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setLoading(false);
		}, 1500);

		return () => {
			setLoading(true);
			clearTimeout(timeout);
		};
	}, [cID, sDate, eDate]);

	const [disable, setDisable] = useState(true);
	useEffect(() => {
		var year = sDate.getFullYear();
		//console.log(year)
		if (year === 1970) setDisable(true);
		else setDisable(false);
		//console.log(disable)
	}, [sDate]);

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
		};
		//console.log(data)
		axios
			.post(
				'http://ec2-52-53-227-112.us-west-1.compute.amazonaws.com/camera/videos',
				data
			)
			.then((res) => {
				//console.log(res.data)
				setHat(res.data.hard_hat);
				setPhy(res.data.physical_distancing);
				setMask(res.data.mask);
				setVest(res.data.viz_vest);
				//setVisual(res.data);
			})
			.catch((err) => console.log(err));
	}, [cID, sDate, eDate]);

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
			{disable === true && (
				<div>
					<Typography
						variant="h4"
						style={{ textAlign: 'center', marginTop: '50px' }}
					>
						Camera has not started streaming yet .
					</Typography>
				</div>
			)}
			{disable === false && (
				<Grid container style={{ marginBottom: '50px', marginTop: '15px' }}>
					<ThemeProvider theme={theme}>
						<div>
							<div
								style={{
									marginBottom: '20px',
									fontFamily: 'Quicksand , sans-serif',
									fontSize: '36px',
								}}
							>
								Incident Visuals
							</div>
							<Grid container spacing={3}>
								{phys.length > 0 && (
									<Grid item xs={12}>
										<Typography
											variant="h5"
											style={{ marginTop: '15px', fontWeight: '600' }}
										>
											Physical Distancing Violations
										</Typography>
									</Grid>
								)}
								{phys.length > 0 &&
									phys.map((phy) => (
										<Grid item lg={4} sm={6} style={{ textAlign: 'center' }}>
											<Paper className={classes.paper} elevation={5}>
												<video
													width="98%"
													height="235"
													controls="true"
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
												<Typography variant="h6">{phy.datetime}</Typography>
											</Paper>
										</Grid>
									))}
								{phys.length > 0 && (
									<Grid item xs={12}>
										<Divider
											style={{ backgroundColor: 'gray', height: '2px' }}
										/>
									</Grid>
								)}
								<Grid item xs={12}>
									{masks.length > 0 && (
										<Typography
											variant="h5"
											style={{ marginTop: '15px', fontWeight: '600' }}
										>
											Mask Violations
										</Typography>
									)}
								</Grid>
								{masks.length > 0 &&
									masks.map((mask) => (
										<Grid item lg={4} sm={6} style={{ textAlign: 'center' }}>
											<Paper className={classes.paper} elevation={5}>
												<video
													width="98%"
													height="235"
													controls="true"
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
												<Typography variant="h6">{mask.datetime}</Typography>
											</Paper>
										</Grid>
									))}
								{masks.length > 0 && (
									<Grid item xs={12}>
										<Divider
											style={{ backgroundColor: 'gray', height: '2px' }}
										/>
									</Grid>
								)}
								<Grid item xs={12}>
									{hats.length > 0 && (
										<Typography
											variant="h5"
											style={{ marginTop: '0px', fontWeight: '600' }}
										>
											PPE Compliance - Hard Hat (Violations)
										</Typography>
									)}
								</Grid>
								{hats.length > 0 &&
									hats.map((hat) => (
										<Grid item lg={4} sm={6} style={{ textAlign: 'center' }}>
											<Paper className={classes.paper} elevation={5}>
												<video
													width="98%"
													height="235"
													controls="true"
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
												<Typography variant="h6">{hat.datetime}</Typography>
											</Paper>
										</Grid>
									))}
								{hats.length > 0 && (
									<Grid item xs={12}>
										<Divider
											style={{ backgroundColor: 'gray', height: '2px' }}
										/>
									</Grid>
								)}
								<Grid item xs={12}>
									{vests.length > 0 && (
										<Typography
											variant="h5"
											style={{ marginTop: '15px', fontWeight: '600' }}
										>
											PPE Compliance - High Viz Vest (Violations)
										</Typography>
									)}
								</Grid>
								{vests.length > 0 &&
									vests.map((vest) => (
										<Grid item lg={4} sm={6} style={{ textAlign: 'center' }}>
											<Paper className={classes.paper} elevation={5}>
												<video
													width="98%"
													height="235"
													controls="true"
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
												<Typography variant="h6">{vest.datetime}</Typography>
											</Paper>
										</Grid>
									))}
								{vests.length > 0 && (
									<Grid item xs={12}>
										<Divider
											style={{ backgroundColor: 'gray', height: '2px' }}
										/>
									</Grid>
								)}
							</Grid>
						</div>
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
									controls="true"
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
}
