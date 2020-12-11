import 'date-fns';
import React, { useState, useEffect, lazy, Suspense } from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from '@material-ui/pickers';
import { Paper, Typography } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios';
//import FormHelperText from '@material-ui/core/FormHelperText';
import Spinner from '../../spinner';
import Team from './team';
import Metrics from './metrics';
import Visual from './visual';
import CanvasDraw from './canvas';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		padding: '20px',
		marginTop: '20px',
	},
	dates: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		color: theme.palette.text.secondary,
		borderRadius: '10px',
	},
	button: {
		display: 'block',
		marginTop: theme.spacing(2),
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 200,
	},
}));

export default function MaterialUIPickers(props) {
	const { bID } = props;

	//Loading
	const [loading, setLoading] = useState(true);

	/* 	useEffect(() => {
		const timeout = setTimeout(() => {
			setLoading(false);
		}, 800);

		return () => {
			setLoading(true);
			clearTimeout(timeout);
		};
	}, []); */

	// Dates
	const [sDate, setsDate] = useState(new Date());
	const [eDate, seteDate] = useState(new Date());

	const [startMax, setstartMax] = useState();
	const [startMin, setstartMin] = useState();
	const [endMax, setendMax] = useState();
	const [endMin, setendMin] = useState();

	const [cameraID, setcameraID] = useState(1);

	const [age, setAge] = React.useState('');
	const handleStartDateChange = (date) => {
		setsDate(date);
		//console.log(sDate)
	};
	const handleEndDateChange = (date) => {
		seteDate(date);
		//console.log(eDate)
	};

	const [disableDate, setdisableDate] = useState(false);

	// Drop down
	const handleChange = (event) => {
		setAge(event.target.value);
	};

	const [open, setOpen] = React.useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	const handleOpen = () => {
		setOpen(true);
	};

	//Camera API call
	const [cameras, setCameras] = useState([]);

	useEffect(() => {
		const data = {
			project_id: localStorage.getItem('projectID'),
			jwt_token: localStorage.getItem('jwt_token'),
			company_id: Number(localStorage.getItem('company_id')),
		};
		axios
			.post('https://api.reflective.ai/project/cameras', data)
			.then((res) => {
				//console.log(res.data);
				setCameras(res.data.cameras);

				if (res.data.cameras.length !== 0) {
					if (res.data.cameras[0].start_date === null) setdisableDate(true);

					onClickHandler(
						-1,
						res.data.cameras[0].end_date,
						res.data.cameras[0].start_date
					);
				}
				setLoading(false);

				/* // setting the 7 day difference

				var diff = (eDate.getTime() - sDate.getTime()) / (1000 * 3600 * 24);

				if (diff > 7) {
					var newDate = new Date(res.data.cameras[0].end_date);
					newDate.setDate(newDate.getDate() - 7);
					setsDate(newDate);
				}
				if (diff <= 7) {
					setsDate(new Date(res.data.cameras[0].start_date));
				} */
			})
			.catch((err) => console.log(err));
	}, []);

	//const [help, sethelp] = useState(true)

	const [visible, setVisible] = useState(true);

	useEffect(() => {
		if (bID === '3' || bID === '4') setVisible(false);
		else setVisible(true);
	}, [bID]);

	function onClickHandler(index, end, start) {
		setcameraID(index + 2);
		if (end !== null) {
			seteDate(new Date(end));
		}
		if (end === null) {
			seteDate(new Date());
		}
		if (start !== null) {
			setsDate(new Date(start));
			setdisableDate(false);
		}
		if (start === null) {
			setdisableDate(true);
		}

		// end date null
		if (end !== null) {
			var currend = new Date(end);
			var currstart = new Date(start);
			var diff = (currend.getTime() - currstart.getTime()) / (1000 * 3600 * 24);

			if (diff > 7) {
				var curr = new Date(end);
				curr.setDate(curr.getDate() - 6);
				setsDate(curr);
			}
			if (diff <= 7) {
				setsDate(currstart);
			}

			setendMax(currend);
			setendMin(currstart);

			setstartMax(currend);
			setstartMin(currstart);
		}

		if (end === null) {
			var currend = new Date();
			var currstart = new Date(start);
			var diff = (currend.getTime() - currstart.getTime()) / (1000 * 3600 * 24);

			if (diff > 7) {
				var curr = new Date();
				curr.setDate(curr.getDate() - 6);
				setsDate(curr);
			}
			if (diff <= 7) {
				setsDate(currstart);
			}
			setendMax(currend);
			setendMin(currstart);

			setstartMax(currend);
			setstartMin(currstart);
		}
	}

	const classes = useStyles();

	if (loading) return <Spinner />;

	return (
		<div className={classes.root}>
			{cameras.length === 0 ? (
				<Typography
					variant="h4"
					style={{ textAlign: 'center', fontWeight: '600', marginTop: '50px' }}
				>
					No Cameras
				</Typography>
			) : (
				<Grid container spacing={3}>
					{visible === true && (
						<Grid item xs={12}>
							<Paper className={classes.paper} elevation={5}>
								<div className={classes.dates}>
									<Grid container spacing={3}>
										<Grid item lg={4} md={6} xs={12}>
											<FormControl className={classes.formControl}>
												<InputLabel
													shrink
													id="demo-controlled-open-select-label"
												>
													Select Camera{' '}
												</InputLabel>
												<Select
													labelId="demo-controlled-open-select-label"
													id="demo-controlled-open-select"
													onClose={handleClose}
													onOpen={handleOpen}
													onChange={handleChange}
													value={age}
													displayEmpty
													disabled={cameras.length === 0 ? true : false}
												>
													<MenuItem
														value=""
														/* onClick={() => {
														//sethelp(false)
														setcameraID(1);
														if (cameras[0].start_date !== null) {
															setsDate(new Date(cameras[0].start_date));
															setdisableDate(false);
														} else if (cameras[0].start_date === null) {
															setdisableDate(true);
														}
													}} */
														onClick={() =>
															onClickHandler(
																-1,
																cameras[0].end_date,
																cameras[0].start_date
															)
														}
													>
														Camera 1
													</MenuItem>
													{cameras.slice(1).map((camera, index) => (
														<MenuItem
															value={camera.camera_id}
															key={index + 1}
															onClick={() =>
																onClickHandler(
																	index,
																	camera.end_date,
																	camera.start_date
																)
															}
														>
															Camera {camera.camera_id}
														</MenuItem>
													))}
												</Select>
												{/*  {help && <FormHelperText>Default Camera 1</FormHelperText>} */}
											</FormControl>
										</Grid>
										<Grid item lg={4} md={6} xs={12}>
											<Typography variant="h6" style={{ color: 'black' }}>
												From Date:
											</Typography>
											<MuiPickersUtilsProvider utils={DateFnsUtils}>
												<KeyboardDatePicker
													margin="normal"
													id="date-picker-dialog"
													format="MM/dd/yyyy"
													onChange={handleStartDateChange}
													value={sDate}
													KeyboardButtonProps={{
														'aria-label': 'change date',
													}}
													variant="outlined"
													disabled={disableDate}
													minDate={startMin}
													maxDate={eDate}
												/>
											</MuiPickersUtilsProvider>
										</Grid>
										<Grid item lg={4} md={6} xs={12}>
											<Typography variant="h6" style={{ color: 'black' }}>
												To Date:
											</Typography>
											<MuiPickersUtilsProvider utils={DateFnsUtils}>
												<KeyboardDatePicker
													margin="normal"
													id="date-picker-dialog"
													format="MM/dd/yyyy"
													onChange={handleEndDateChange}
													value={eDate}
													KeyboardButtonProps={{
														'aria-label': 'change date',
													}}
													variant="outlined"
													disabled={disableDate}
													minDate={endMin}
													maxDate={endMax}
												/>
											</MuiPickersUtilsProvider>
										</Grid>
									</Grid>
								</div>
							</Paper>
						</Grid>
					)}
					<Grid item xs={12}>
						{bID === '1' && (
							<Metrics cID={cameraID} sDate={sDate} eDate={eDate} />
						)}
						{bID === '2' && (
							<Visual cID={cameraID} sDate={sDate} eDate={eDate} />
						)}
						{bID === '3' && <Team />}
						{bID === '4' && <CanvasDraw />}
					</Grid>
				</Grid>
			)}
		</div>
	);
}
