import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import video1 from './assets/video.mp4';
import Spinner from '../../spinner';

//Resposive text
import Typography from '@material-ui/core/Typography';

//images

import crowdimg from './assets/crowd.jpg';
import occupancyimg from './assets/occupancy.jpg';
import maskimg from './assets/mask.jpg';
import phyimg from './assets/phy.jpg';
import hatimg from './assets/hat.jpg';
import vestimg from './assets/vest.jpg';

//Graph
import HardHatGraph from './graphs/hardhat';
import MaskGraph from './graphs/mask';
import VestGraph from './graphs/vest';
import PhyGraph from './graphs/phydist';
import OccGraph from './graphs/occmax';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		marginTop: '20px',
	},
	paper: {
		color: 'black',
		height: '220px',
		borderRadius: '10px',
		padding: '30px 20px 30px 20px',
	},
}));

export default function Risk(props) {
	const { cID, sDate, eDate } = props;

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setLoading(false);
		}, 1200);

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

	/*   console.log(startDate)
    console.log(endDate) */
	const classes = useStyles();

	const matches = useMediaQuery('(min-width:700px)');
	const floatPic = matches ? 'right' : 'right';
	const paperHeight = matches ? '180px' : '250px';

	// Metric
	const [metric, setMetric] = useState([]);

	useEffect(() => {
		const data = {
			project_id: Number(localStorage.getItem('projectID')),
			jwt_token: localStorage.getItem('jwt_token'),
			camera_id: cID,
			start_date: startDate,
			end_date: endDate,
		};
		//console.log(data)
		axios
			.post(
				'http://ec2-52-53-227-112.us-west-1.compute.amazonaws.com/camera/metrics',
				data
			)
			.then((res) => {
				//console.log(res.data)
				setMetric(res.data);
			})
			.catch((err) => console.log(err));
	}, [cID, sDate, eDate]);

	//console.log(metric)
	var mask = 0;
	if (metric !== undefined) {
		mask = metric.ppe_compliance_mask;
	}

	var social_distancing = 0;
	if (metric !== undefined) {
		social_distancing = metric.ppe_compliance_sd;
	}

	var hard_hat = 0;
	if (metric !== undefined) {
		hard_hat = metric.ppe_compliance_hardhat;
	}

	var vis_vest = 0;
	if (metric !== undefined) {
		vis_vest = metric.ppe_compliance_viz_vest;
	}

	var occ = 0;
	if (metric !== undefined) {
		occ = metric.occupancy_max;
	}

	if (loading) return <Spinner />;
	return (
		<div className={classes.root}>
			{disable === true && (
				<div>
					<Typography variant="h4" style={{ textAlign: 'center' }}>
						Camera has not started streaming yet .
					</Typography>
				</div>
			)}
			{disable === false && (
				<div>
					<Typography
						variant="h4"
						style={{
							marginBottom: '20px',
							marginTop: '20px',
							fontFamily: 'Quicksand , sans-serif',
						}}
					>
						Safety Metrics
					</Typography>
					<Grid container spacing={3}>
						{mask !== null && (
							<Grid item lg={6} xs={12} md={6}>
								<Paper
									className={classes.paper}
									style={{ height: paperHeight }}
									elevation={10}
								>
									<div
										style={{
											float: 'left',
											width: '70%',
										}}
									>
										<Typography
											variant="h5"
											style={{ fontFamily: 'Roboto , sans-serif' }}
										>
											{' '}
											PPE Compliance - Face Mask (%)
										</Typography>
										<Typography
											variant="h4"
											style={{
												color: 'orange',
												margin: '3px 0px 3px 0px',
												fontWeight: '600',
											}}
										>
											{mask}
										</Typography>
									</div>
									<div style={{ float: floatPic, width: '30%', right: '0' }}>
										<img
											alt="risk-images"
											src={maskimg}
											width="70px"
											height="70px"
											style={{ float: floatPic }}
										/>
									</div>
								</Paper>
							</Grid>
						)}
						{social_distancing !== null && (
							<Grid item lg={6} xs={12} md={6}>
								<Paper
									className={classes.paper}
									style={{ height: paperHeight }}
									elevation={10}
								>
									<div
										style={{
											float: 'left',

											width: '70%',
										}}
									>
										<Typography
											variant="h5"
											style={{ fontFamily: 'Roboto , sans-serif' }}
										>
											Physical Distancing Violations
										</Typography>

										<Typography
											variant="h4"
											style={{
												color: 'orange',
												margin: '3px 0px 3px 0px',
												fontWeight: '600',
											}}
										>
											{social_distancing}
										</Typography>
									</div>
									<div style={{ float: floatPic, width: '30%' }}>
										<img
											alt="risk-images"
											src={phyimg}
											width="70px"
											height="70px"
											style={{ float: floatPic }}
										/>
									</div>
								</Paper>
							</Grid>
						)}
						{hard_hat !== null && (
							<Grid item lg={6} xs={12} md={6}>
								<Paper
									className={classes.paper}
									style={{ height: paperHeight }}
									elevation={10}
								>
									<div
										style={{
											float: 'left',
											width: '70%',
										}}
									>
										<Typography
											variant="h5"
											style={{ fontFamily: 'Roboto , sans-serif' }}
										>
											PPE Compliance - Hard Hat (%)
										</Typography>

										<Typography
											variant="h4"
											style={{
												color: 'orange',
												margin: '3px 0px 3px 0px',
												fontWeight: '600',
											}}
										>
											{hard_hat}
										</Typography>
									</div>
									<div style={{ float: floatPic, width: '30%' }}>
										<img
											alt="risk-images"
											src={hatimg}
											width="70px"
											height="70px"
											style={{ float: floatPic }}
										/>
									</div>
								</Paper>
							</Grid>
						)}
						{vis_vest !== null && (
							<Grid item lg={6} xs={12} md={6}>
								<Paper
									className={classes.paper}
									style={{ height: paperHeight }}
									elevation={10}
								>
									<div
										style={{
											float: 'left',
											width: '70%',
										}}
									>
										<Typography
											variant="h5"
											style={{ fontFamily: 'Roboto , sans-serif' }}
										>
											PPE Compliance - High Viz Vest (%)
										</Typography>

										<Typography
											variant="h4"
											style={{
												color: 'orange',
												margin: '3px 0px 3px 0px',
												fontWeight: '600',
											}}
										>
											{vis_vest}
										</Typography>
									</div>
									<div style={{ float: floatPic, width: '30%' }}>
										<img
											alt="risk-images"
											src={vestimg}
											width="70px"
											height="70px"
											style={{ float: floatPic }}
										/>
									</div>
								</Paper>
							</Grid>
						)}
						{social_distancing !== null && (
							<Grid item lg={6} xs={12} md={6}>
								<Paper
									className={classes.paper}
									style={{ height: paperHeight }}
									elevation={10}
								>
									<div
										style={{
											float: 'left',
											width: '70%',
										}}
									>
										<Typography
											variant="h5"
											style={{ fontFamily: 'Roboto , sans-serif' }}
										>
											Crowding Violations
										</Typography>

										<Typography
											variant="h4"
											style={{
												color: 'orange',
												margin: '3px 0px 3px 0px',
												fontSize: '30px',
												fontWeight: '600',
											}}
										>
											{social_distancing}
										</Typography>
									</div>
									<div style={{ float: floatPic, width: '30%' }}>
										<img
											alt="risk-images"
											src={crowdimg}
											width="70px"
											height="70px"
											style={{ float: floatPic }}
										/>
									</div>
								</Paper>
							</Grid>
						)}
						{occ !== null && (
							<Grid item lg={6} xs={12} md={6}>
								<Paper
									className={classes.paper}
									style={{ height: paperHeight }}
									elevation={10}
								>
									<div
										style={{
											float: 'left',

											width: '70%',
										}}
									>
										<Typography
											variant="h5"
											style={{ fontFamily: 'Roboto , sans-serif' }}
										>
											Occupancy Maximum
										</Typography>
										<Typography
											variant="h4"
											style={{
												color: 'orange',
												margin: '3px 0px 3px 0px',
												fontSize: '30px',
												fontWeight: '600',
											}}
										>
											{occ}
										</Typography>
									</div>
									<div style={{ float: floatPic, width: '30%' }}>
										<img
											alt="risk-images"
											src={occupancyimg}
											width="70px"
											height="70px"
											style={{ float: floatPic }}
										/>
									</div>
								</Paper>
							</Grid>
						)}
						{social_distancing !== null && (
							<Grid item xs={12}>
								<div
									style={{
										marginTop: '50px',
										fontFamily: 'Quicksand , sans-serif',
										fontSize: '36px',
									}}
								>
									Hotspot Analysis
								</div>
							</Grid>
						)}
						<Grid item xs={12}>
							{social_distancing !== null && (
								<Paper
									className={classes.paper}
									style={{ height: '730px', marginBottom: '50px' }}
									elevation={10}
								>
									<iframe
										width="100%"
										height="680px"
										src={video1}
										frameborder="0"
										controls
										allowfullscreen
										title="video"
										style={{
											borderRadius: '5px',
											display: 'inline-block',
											margin: '0 auto',
										}}
									></iframe>
								</Paper>
							)}
						</Grid>
					</Grid>
				</div>
			)}
			{disable === false && (
				<Typography
					variant="h4"
					style={{
						marginTop: '20px',
						fontFamily: 'Quicksand , sans-serif',
					}}
				>
					Safety Metrics By Date
				</Typography>
			)}
			{hard_hat !== null && (
				<HardHatGraph cID={cID} sDate={sDate} eDate={eDate} />
			)}
			{mask !== null && <MaskGraph cID={cID} sDate={sDate} eDate={eDate} />}
			{vis_vest !== null && <VestGraph cID={cID} sDate={sDate} eDate={eDate} />}
			{social_distancing !== null && (
				<PhyGraph cID={cID} sDate={sDate} eDate={eDate} />
			)}
			{occ !== null && <OccGraph cID={cID} sDate={sDate} eDate={eDate} />}
		</div>
	);
}
