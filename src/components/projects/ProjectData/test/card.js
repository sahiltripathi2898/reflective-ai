import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';

//Icons
import { FaArrowCircleDown } from 'react-icons/fa';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		paddingLeft: '20px',
	},
	paper: {
		height: 200,
		width: 280,
		padding: '20px',
	},
}));

export default function SpacingGrid() {
	const classes = useStyles();

	return (
		<div>
			<div
				style={{
					marginLeft: '20px',
					fontSize: '2rem',
					marginBottom: '20px',
					marginTop: '20px',
					fontFamily: 'revert',
					fontWeight: '600',
				}}
			>
				Alerts
			</div>

			<Grid container className={classes.root} spacing={3} justify="left">
				<Grid item>
					<Paper
						className={classes.paper}
						elevation={8}
						style={{ borderRadius: '10px' }}
					>
						<div
							style={{
								fontSize: '24px',
								textAlign: 'center',
								marginBottom: '5px',
							}}
						>
							Unauthorized Entry
						</div>

						<Grid
							container
							style={{ marginTop: '0px', padding: '10px', paddingTop: '0px' }}
							spacing={9}
						>
							<Grid
								item
								style={{
									fontSize: '38px',
									padding: '14px',
									marginLeft: '6px',
									color: 'orange',
								}}
								xs={12}
							>
								2
							</Grid>
						</Grid>
					</Paper>
				</Grid>
				<Grid item>
					<Paper
						className={classes.paper}
						elevation={8}
						style={{ borderRadius: '10px' }}
					>
						<div
							style={{
								fontSize: '24px',
								textAlign: 'center',
								marginBottom: '5px',
							}}
						>
							Worker Count
						</div>
						<Grid
							container
							style={{ marginTop: '0px', padding: '10px', paddingTop: '0px' }}
							spacing={9}
						>
							<Grid
								item
								style={{
									fontSize: '38px',
									padding: '14px',
									marginLeft: '6px',
									paddingBottom: '8px',
								}}
							>
								19
							</Grid>
							<Grid
								item
								style={{
									fontSize: '36px',
									color: 'red',
									padding: '15px',
									marginLeft: '40px',
									paddingBottom: '8px',
								}}
							>
								-24.2%
								<FaArrowCircleDown style={{ fontSize: '30px' }} />
							</Grid>
							<Typography
								variant="h5"
								style={{
									marginLeft: '5px',
									color: 'gray',
									textAlign: 'center',
								}}
							>
								From previous week's count
							</Typography>
						</Grid>
						{/* <Typography variant="h4" style={{
            }}>
              19
            </Typography>
            <Typography variant="h4" style={{
              color: 'red',
            }}>
              -24.2  <FaArrowCircleDown style={{ fontSize: '30px' }} />
            </Typography>
            <Typography variant="h5">
              Down from last week
            </Typography> */}
					</Paper>
				</Grid>
				<Grid item>
					<Paper
						className={classes.paper}
						elevation={8}
						style={{ borderRadius: '10px' }}
					>
						<div
							style={{
								fontSize: '24px',
								textAlign: 'center',
								marginBottom: '5px',
								borderRadius: '10px',
							}}
						>
							Weekly Average
						</div>
						<Grid
							container
							style={{ marginTop: '0px', padding: '10px', paddingTop: '0px' }}
							spacing={9}
						>
							<Grid
								item
								style={{
									fontSize: '38px',
									padding: '14px',
									marginLeft: '6px',
									color: 'orange',
									paddingBottom: '6px',
								}}
							>
								14
							</Grid>
							{/*               <Grid
                item
                style={{
                  fontSize: '36px',
                  color: 'red',
                  padding: '15px',
                  marginLeft: '40px',
                }}
              >
                -24.2%
                <FaArrowCircleDown style={{ fontSize: '30px' }} />
              </Grid> */}
							{/* <Typography variant="h5" style={{ marginLeft: '5px', color: 'gray', textAlign: 'center' }}>
                Down from last week's count
            </Typography> */}
						</Grid>
					</Paper>
				</Grid>
			</Grid>
		</div>
	);
}
