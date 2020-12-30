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
	paper: {
		color: 'black',
		borderRadius: '10px',
		padding: '10px 10px 15px 10px',
	},
}));

function CanvasMetrics(props) {
	const classes = useStyles();
	const { time, incidences } = props;

	const matches = useMediaQuery('(min-width:700px)');
	const floatPic = matches ? 'right' : 'right';
	const paperHeight = matches ? '115px' : '150px';
	return (
		<div>
			<Grid container spacing={3}>
				<Grid item lg={3} xs={12} md={6}>
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
								style={{ fontFamily: 'Roboto , sans-serif' }}
							>
								{' '}
								Total Time of Violations
							</Typography>
							<Typography
								variant="h5"
								style={{
									color: 'orange',
									fontWeight: '600',
									top: '0',
								}}
							>
								{time}
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
				</Grid>
				<Grid item lg={3} xs={12} md={6}>
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
								style={{ fontFamily: 'Roboto , sans-serif' }}
							>
								{' '}
								Total Risk Score
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
				</Grid>
				<Grid item lg={3} xs={12} md={6}>
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
								style={{ fontFamily: 'Roboto , sans-serif' }}
							>
								{' '}
								Today's Risk Score
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
				</Grid>
				<Grid item lg={3} xs={12} md={6}>
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
								style={{ fontFamily: 'Roboto , sans-serif' }}
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
				</Grid>
			</Grid>
		</div>
	);
}

export default CanvasMetrics;
