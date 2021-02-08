import React from 'react';
import {
	Typography,
	Grid,
	Paper,
	useMediaQuery,
	makeStyles,
} from '@material-ui/core';
import statusimg from '../assets/status.jpg';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		marginTop: '40px',
	},
	/* 	paper: {
		color: 'black',
		borderRadius: '10px',
		padding: '5px',
	}, */
	paper: {
		color: 'black',
		borderRadius: '10px',
		padding: '30px 20px 30px 20px',
	},
}));

function CanvasMetrics(props) {
	const classes = useStyles();
	const { incidences } = props;

	const matches = useMediaQuery('(min-width:700px)');
	const floatPic = matches ? 'right' : 'right';
	const paperHeight = matches ? '125px' : '125px';
	return (
		<div>
			<Grid container spacing={3}>
				{/* <Grid item xs={12} md={6}>
					<Paper
						className={classes.paper}
						style={{ height: paperHeight }}
						elevation={6}
					>
						<div
							style={{
								width: '100%',
							}}
						>
							<div style={{ width: '100%', height: '30px' }}>
								<img
									alt="risk-images"
									src={statusimg}
									width="30px"
									height="30px"
									style={{ float: floatPic }}
								/>
							</div>
							<Typography
								variant="h4"
								style={{
									color: 'orange',
									fontWeight: '600',
									textAlign: 'center',
								}}
							>
								{incidences}
							</Typography>
							<Typography
								variant="h6"
								style={{
									fontFamily: 'Roboto , sans-serif',
									lineHeight: '1.4',
									textAlign: 'center',
									marginTop: '5px',
								}}
							>
								{' '}
								Total Incidences
							</Typography>
						</div>
					</Paper>
				</Grid>
				<Grid item xs={12} md={6}>
					<Paper
						className={classes.paper}
						style={{ height: paperHeight }}
						elevation={6}
					>
						<div
							style={{
								width: '100%',
							}}
						>
							<div style={{ width: '100%', height: '30px' }}>
								<img
									alt="risk-images"
									src={statusimg}
									width="30px"
									height="30px"
									style={{ float: floatPic }}
								/>
							</div>
							<Typography
								variant="h4"
								style={{
									color: 'orange',
									fontWeight: '600',
									textAlign: 'center',
								}}
							>
								{risk}
							</Typography>
							<Typography
								variant="h6"
								style={{
									fontFamily: 'Roboto , sans-serif',
									lineHeight: '1.4',
									textAlign: 'center',
									marginTop: '5px',
								}}
							>
								{' '}
								Risk
							</Typography>
						</div>
					</Paper>
				</Grid>
				<Grid item xs={12} md={6}>
					<Paper
						className={classes.paper}
						style={{ height: paperHeight }}
						elevation={6}
					>
						<div
							style={{
								float: 'left',
								width: '70%',
							}}
						>
							<Typography
								variant="h6"
								style={{ fontFamily: 'Roboto , sans-serif', lineHeight: '1.4' }}
							>
								{' '}
								Average People violating
							</Typography>
							<Typography
								variant="h5"
								style={{
									color: 'orange',
									top: '0',
									fontWeight: '600',
								}}
							>
								{incidences}
							</Typography>
						</div>
						<div style={{ float: floatPic, width: '30%', right: '0' }}>
							<img
								alt="risk-images"
								src={statusimg}
								width="40px"
								height="40px"
								style={{ float: floatPic }}
							/>
						</div>
					</Paper>
				</Grid> */}
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
								style={{
									fontFamily: 'Roboto , sans-serif',
									fontWeight: '400',
									fontSize: '1rem',
								}}
							>
								No. of Unauthorized Entries
							</Typography>
							<Typography
								variant="h4"
								style={{
									color: 'orange',
									margin: '3px 0px 3px 0px',
									fontSize: '1.5rem',
									fontWeight: '600',
								}}
							>
								{incidences}
							</Typography>
						</div>
						<div style={{ float: floatPic, width: '30%' }}>
							<img
								alt="risk-images"
								src={statusimg}
								width="70px"
								height="70px"
								style={{ float: floatPic }}
							/>
						</div>
					</Paper>
				</Grid>
				{/* <Grid item lg={6} xs={12} md={6}>
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
								Risk
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
								{risk}
							</Typography>
						</div>
						<div style={{ float: floatPic, width: '30%' }}>
							<img
								alt="risk-images"
								src={statusimg}
								width="70px"
								height="70px"
								style={{ float: floatPic }}
							/>
						</div>
					</Paper>
				</Grid> */}
			</Grid>
		</div>
	);
}

export default CanvasMetrics;
