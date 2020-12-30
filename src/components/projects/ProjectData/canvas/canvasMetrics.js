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
		padding: '5px 5px 10px 5px',
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
				<Grid item lg={6} xs={12} md={6}>
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
								Total Time
							</Typography>
							<Typography
								variant="h5"
								style={{
									color: 'orange',
									margin: '42px 0px 3px 0px',

									fontWeight: '600',
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
				<Grid item lg={6} xs={12} md={6}>
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
								Total Incidences
							</Typography>
							<Typography
								variant="h5"
								style={{
									color: 'orange',
									margin: '10px 0px 3px 0px',

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
