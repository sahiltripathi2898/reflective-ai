import React from 'react';
import { Typography, Grid, Paper, makeStyles } from '@material-ui/core';
import {
	createMuiTheme,
	responsiveFontSizes,
	ThemeProvider,
} from '@material-ui/core/styles';

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

function CanvasVisuals() {
	const classes = useStyles();
	return (
		<div>
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
					<Grid container spacing={3}>
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
								<Grid
									item
									lg={4}
									sm={6}
									style={{ textAlign: 'center', marginTop: '20px' }}
								>
									<Paper className={classes.paper} elevation={5}>
										<video
											width="98%"
											height="235"
											controls={true}
											poster={
												'https://api.reflective.ai/media' +
												'/home/ubuntu/Safety_Product/videos/1/4/2020-08-17 00:00:00/2020-08-17 05:37:34--sd_violations--142--43.jpg'
											}
											/*onClick={() => {
															handleOpen();
															setModalVideo(
																'https://api.reflective.ai/media' +
																	phy.data_path
															);
														}} */
											style={{ outline: 'none', cursor: 'pointer' }}
										>
											<source
												src={
													'https://api.reflective.ai/media' +
													'/home/ubuntu/Safety_Product/videos/1/4/2020-08-17 00:00:00/2020-08-17 05:37:34--sd_violations--142--43.mp4'
												}
											/>
										</video>
										<Typography variant="h6">
											{/* {phy.datetime.substring(0, 25)} */}
										</Typography>
									</Paper>
								</Grid>
								<Grid
									item
									lg={4}
									sm={6}
									style={{ textAlign: 'center', marginTop: '20px' }}
								>
									<Paper className={classes.paper} elevation={5}>
										<video
											width="98%"
											height="235"
											controls={true}
											poster={
												'https://api.reflective.ai/media' +
												'/home/ubuntu/Safety_Product/videos/1/4/2020-08-17 00:00:00/2020-08-17 05:37:34--sd_violations--142--43.jpg'
											}
											/*onClick={() => {
															handleOpen();
															setModalVideo(
																'https://api.reflective.ai/media' +
																	phy.data_path
															);
														}} */
											style={{ outline: 'none', cursor: 'pointer' }}
										>
											<source
												src={
													'https://api.reflective.ai/media' +
													'/home/ubuntu/Safety_Product/videos/1/4/2020-08-17 00:00:00/2020-08-17 05:37:34--sd_violations--142--43.mp4'
												}
											/>
										</video>
										<Typography variant="h6">
											{/* {phy.datetime.substring(0, 25)} */}
										</Typography>
									</Paper>
								</Grid>
								<Grid
									item
									lg={4}
									sm={6}
									style={{ textAlign: 'center', marginTop: '20px' }}
								>
									<Paper className={classes.paper} elevation={5}>
										<video
											width="98%"
											height="235"
											controls={true}
											poster={
												'https://api.reflective.ai/media' +
												'/home/ubuntu/Safety_Product/videos/1/4/2020-08-17 00:00:00/2020-08-17 05:37:34--sd_violations--142--43.jpg'
											}
											/*onClick={() => {
															handleOpen();
															setModalVideo(
																'https://api.reflective.ai/media' +
																	phy.data_path
															);
														}} */
											style={{ outline: 'none', cursor: 'pointer' }}
										>
											<source
												src={
													'https://api.reflective.ai/media' +
													'/home/ubuntu/Safety_Product/videos/1/4/2020-08-17 00:00:00/2020-08-17 05:37:34--sd_violations--142--43.mp4'
												}
											/>
										</video>
										<Typography variant="h6">
											{/* {phy.datetime.substring(0, 25)} */}
										</Typography>
									</Paper>
								</Grid>
							</Grid>
						</div>
					</Grid>
				</ThemeProvider>
			</Grid>
		</div>
	);
}

export default CanvasVisuals;
