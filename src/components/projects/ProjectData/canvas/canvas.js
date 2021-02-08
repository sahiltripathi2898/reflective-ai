import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Konva from 'konva';
//import ColorPicker from 'material-ui-color-picker';
import { makeStyles } from '@material-ui/core/styles';
import { HuePicker } from 'react-color';
import { Stage, Layer, Line, Circle, Image } from 'react-konva';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import {
	Button,
	Typography,
	Grid,
	Paper,
	List,
	ListItemIcon,
	ListItem,
	Tooltip,
	TextField,
	Divider,
} from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import IconButton from '@material-ui/core/IconButton';
import RestorePageIcon from '@material-ui/icons/RestorePage';
import CancelIcon from '@material-ui/icons/Cancel';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import FormatColorResetIcon from '@material-ui/icons/FormatColorReset';
import SwitchCameraIcon from '@material-ui/icons/SwitchCamera';
//import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import EditIcon from '@material-ui/icons/Edit';
import VideocamIcon from '@material-ui/icons/Videocam';

import CanvasMetrics from './canvasMetrics';
import Spinner from '../../../spinner';

///////////// Uploaded image on Konva canvas
class URLImage extends React.Component {
	state = {
		image: null,
	};
	componentDidMount() {
		this.loadImage();
	}
	componentDidUpdate(oldProps) {
		if (oldProps.src !== this.props.src) {
			this.loadImage();
		}
	}
	componentWillUnmount() {
		this.image.removeEventListener('load', this.handleLoad);
	}
	loadImage() {
		// save to "this" to remove "load" handler on unmount
		this.image = new window.Image();
		this.image.src = this.props.src;
		this.image.addEventListener('load', this.handleLoad);
	}
	handleLoad = () => {
		// after setState react-konva will update canvas and redraw the layer
		// because "image" property is changed
		this.setState({
			image: this.image,
		});
		// if you keep same image object during source updates
		// you will have to update layer manually:
		// this.imageNode.getLayer().batchDraw();
	};
	render() {
		return (
			<Image
				x={0}
				y={0}
				image={this.state.image}
				ref={(node) => {
					this.imageNode = node;
				}}
				width={720}
				height={420}
			/>
		);
	}
}

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

//////////// Main Function/////////////////

const Canvas = (props) => {
	const { cID } = props;
	const [cameraID, setcameraID] = useState(cID);

	/////// Drawing refs
	const polyRef = React.useRef();
	const circleRef = React.useRef();

	const [loading, setLoading] = useState(true);

	const [selected, setSelected] = useState(false);

	/////// Video Mode
	const [videoMode, setvideoMode] = useState(false);
	const [videoSrc, setvideoSrc] = useState('');
	const [hazardVideos, sethazardVideos] = useState([]);

	//////// Edit Mode
	const [editMode, seteditMode] = useState(false);

	/////// Co-ordinates
	const [points, setPoints] = useState([]);

	/////// Co-ordinates from backend if hazard zone already present
	const [coordinates, setCoordinates] = useState([]);

	////// Image height and width to be scaled with
	const [imgHeightRatio, setimgHeightRatio] = useState(0);
	const [imgWidthRatio, setimgWidthRatio] = useState(0);

	////// Image Source
	const [imgSrc, setimgSrc] = useState('');

	////// Show editing icons
	const [addMode, setaddMode] = useState(false);

	////// Hazard Zone Available
	const [hazardZoneAvailable, sethazardZoneAvailable] = useState(false);

	/////// Free Draw Mode
	const [freeDraw, setfreeDraw] = useState(false);

	////// Metrics Value
	//const [riskValue, setriskValue] = useState(0);
	const [entries, setentries] = useState(0);

	////// Hazard Zone values
	const [hazardName, sethazardName] = useState('');
	const [hazardColor, sethazardColor] = useState('#ba000d');
	// Dates
	const [hazardZoneCameraStartDate, setstartDate] = useState();
	const [hazardZoneCameraEndDate, setendDate] = useState();

	const [hazardZoneStartMinDate, sethazardZoneStartMinDate] = useState();
	const [hazardZoneStartMaxDate, sethazardZoneStartMaxDate] = useState();
	const [hazardZoneEndMinDate, sethazardZoneEndMinDate] = useState();
	const [hazardZoneEndMaxDate, sethazardZoneEndMaxDate] = useState();

	/* 	const hazardZoneColorChangeHandler = (event) => {
		sethazardColor(event.target.value);
	}; */

	const hazardZoneNameChangeHandler = (event) => {
		sethazardName(event.target.value);
	};

	const [fire, setFire] = useState(false);

	/////////////////////API calls////////////////
	useEffect(() => {
		setLoading(true);
		sethazardName('');
		sethazardName('');
		sethazardColor('');
		setaddMode(false);
		seteditMode(false);
		setfreeDraw(false);
		sethazardZoneAvailable(false);
	}, [cameraID]);

	useEffect(() => {
		setLoading(true);
	}, [hazardZoneCameraStartDate, hazardZoneCameraEndDate]);

	useEffect(() => {
		async function fetchData() {
			const data = {
				project_id: Number(localStorage.getItem('projectID')),
				camera_id: cameraID,
				company_id: Number(localStorage.getItem('company_id')),
			};
			console.log('Main Hazard Zone API');
			console.log(data);
			const res = await axios.post(
				'https://api.reflective.ai/hazard_zone',
				data
			);
			console.log(res.data);
			setimgWidthRatio(res.data.image_width / 720);
			setimgHeightRatio(res.data.image_height / 420);
			setimgSrc(res.data.src);

			if (res.data.hazard_flag === 0) {
				setdisableCameraDate(true);
				sethazardZoneAvailable(false);
				setLoading(false);
			}
			if (res.data.hazard_flag === 1) {
				generateVideos(
					new Date(res.data.start_date),
					new Date(res.data.end_date)
				);
				hazardZoneDateSetter(res.data.end_date, res.data.start_date);
				setdisableCameraDate(false);
				sethazardZoneAvailable(true);
				var curr = res.data.coordinates;
				var stored = [];
				var width = res.data.image_width / 720;
				var height = res.data.image_height / 420;
				for (var i = 0; i < curr.length; i++) {
					stored.push(curr[i][0] / width);
					stored.push(curr[i][1] / height);
				}
				setCoordinates(stored);
			}
		}
		fetchData();
	}, [fire, cameraID]);

	///////////// Hazard Zone Date Setter//////////
	function hazardZoneDateSetter(end, start) {
		if (end !== null) {
			setendDate(new Date(end));
		}
		if (end === null) {
			setendDate(new Date());
		}
		if (start !== null) {
			setstartDate(new Date(start));
			//setdisableCameraDate(false);
		}
		if (start === null) {
			//setdisableCameraDate(true);
		}

		// end date null
		if (end !== null) {
			var currend = new Date(end);
			var currstart = new Date(start);
			var diff = (currend.getTime() - currstart.getTime()) / (1000 * 3600 * 24);

			if (diff > 3) {
				var curr = new Date(end);
				curr.setDate(curr.getDate() - 3);
				setstartDate(curr);
			}
			if (diff <= 3) {
				setstartDate(currstart);
			}

			sethazardZoneEndMaxDate(currend);
			sethazardZoneEndMinDate(currstart);

			sethazardZoneStartMaxDate(currend);
			sethazardZoneStartMinDate(currstart);
		}

		if (end === null) {
			var currend = new Date();
			var currstart = new Date(start);
			var diff = (currend.getTime() - currstart.getTime()) / (1000 * 3600 * 24);

			if (diff > 3) {
				var curr = new Date();
				curr.setDate(curr.getDate() - 3);
				setstartDate(curr);
			}
			if (diff <= 3) {
				setstartDate(currstart);
			}
			sethazardZoneEndMaxDate(currend);
			sethazardZoneEndMinDate(currstart);

			sethazardZoneStartMaxDate(currend);
			sethazardZoneStartMinDate(currstart);
		}
	}

	///////////// video and metrics api caller///////
	const generateVideos = async (start, end) => {
		//console.log('Generate Video');
		//console.log(start);
		//console.log(end);
		const data = {
			project_id: Number(localStorage.getItem('projectID')),
			jwt_token: localStorage.getItem('jwt_token'),
			camera_id: cameraID,
			company_id: Number(localStorage.getItem('company_id')),
			start_date: start.toISOString().slice(0, 10) + ' 00:00:00',
			end_date: end.toISOString().slice(0, 10) + ' 23:00:00',
		};
		console.log('Videos');
		console.log(data);
		setPoints([]);
		setCoordinates([]);
		const res = await axios.post(
			'https://api.reflective.ai/hazard/videos',
			data
		);
		console.log(res.data);
		sethazardVideos(res.data.hazard_zone_violations);

		const newData = {
			project_id: Number(localStorage.getItem('projectID')),
			camera_id: cameraID,
			company_id: Number(localStorage.getItem('company_id')),
			start_date: start.toISOString().slice(0, 10) + ' 00:00:00',
			end_date: end.toISOString().slice(0, 10) + ' 23:00:00',
		};
		console.log('Hazard Metrics');
		console.log(newData);
		const metricsRes = await axios.post(
			'https://api.reflective.ai/metrics/hazard_zone',
			newData
		);
		console.log(metricsRes.data);
		//setriskValue(metricsRes.data.risk_score);
		setentries(metricsRes.data.no_of_unauthorized_entries);
		setLoading(false);
	};
	////// Button Click Handlers
	const createHazardZoneClickHandler = async () => {
		//// Scaling
		var width = imgWidthRatio;
		var height = imgHeightRatio;

		var curr = [...points];
		console.log(width);
		console.log(height);
		console.log(curr);
		var finalCoordinates = [];
		var pair = [];
		//pair.push(curr[0]);
		for (var i = 0; i < curr.length - 1; ) {
			pair.push(curr[i] * width);
			pair.push(curr[i + 1] * height);
			finalCoordinates.push(pair);
			pair = [];
			i += 2;
		}
		console.log(finalCoordinates);
		/// Set points and everything to backend /register_hazard_zone
		const newdata = {
			project_id: Number(localStorage.getItem('projectID')),
			camera_id: cameraID,
			company_id: Number(localStorage.getItem('company_id')),
			name: hazardName,
			color: hazardColor,
			start_date: cameraStartDate.toISOString().slice(0, 10) + ' 00:00:00',
			end_date: cameraEndDate.toISOString().slice(0, 10) + ' 23:00:00',
			coordinates: finalCoordinates,
		};
		console.log(newdata);
		setPoints([]);
		setCoordinates([]);
		const res = await axios.post(
			'https://api.reflective.ai/register_hazard_zone',
			newdata
		);
		console.log(res);

		seteditMode(false);
		setaddMode(false);
		sethazardZoneAvailable(true);
		setFire(!fire);
	};

	///////////// Upload Images and Edit button options///////////

	const stageRef = React.useRef(null);
	const stageRefFree = React.useRef(null);

	function stageClick(e) {
		var stage = e.target.getStage();
		setPoints((old) => [
			...old,
			stage.getPointerPosition().x,
			stage.getPointerPosition().y,
		]);
	}

	function imageUpload(e) {
		var file = document.getElementById('icon-button-file').files;
		//console.log(file);
		setimgSrc(URL.createObjectURL(file[0]));
	}

	function clearStage() {
		setPoints([]);
		setLines([]);
	}
	function undoStage() {
		var old = [...points];
		old.pop();
		old.pop();
		setPoints(old);
	}

	///////////////// Date Change Handler///////////////////

	const [go, setGo] = useState(true);
	const hazardZoneCameraStartDateChangeHandler = (date) => {
		setstartDate(date);
		setGo((old) => !old);
		//console.log(sDate)
	};
	const hazardZoneCameraEndDateChangeHandler = (date) => {
		setendDate(date);
		setGo((old) => !old);
		//console.log(endDate)
	};

	//// Metrics API

	useEffect(() => {
		async function fetchMetrics() {
			const newData = {
				project_id: Number(localStorage.getItem('projectID')),
				camera_id: cameraID,
				company_id: Number(localStorage.getItem('company_id')),
				start_date:
					hazardZoneCameraStartDate.toISOString().slice(0, 10) + ' 00:00:00',
				end_date:
					hazardZoneCameraEndDate.toISOString().slice(0, 10) + ' 23:00:00',
			};
			console.log('Hazard Metrics using date change');
			console.log(newData);
			const metricsRes = await axios.post(
				'https://api.reflective.ai/metrics/hazard_zone',
				newData
			);
			console.log(metricsRes.data);
			//setriskValue(metricsRes.data.risk_score);
			setentries(metricsRes.data.no_of_unauthorized_entries);
			setLoading(false);
		}
		if (hazardZoneCameraStartDate !== undefined) fetchMetrics();
	}, [go]);

	//// Video API

	useEffect(() => {
		async function fetchMetrics() {
			const data = {
				project_id: Number(localStorage.getItem('projectID')),
				jwt_token: localStorage.getItem('jwt_token'),
				camera_id: cameraID,
				company_id: Number(localStorage.getItem('company_id')),
				start_date:
					hazardZoneCameraStartDate.toISOString().slice(0, 10) + ' 00:00:00',
				end_date:
					hazardZoneCameraEndDate.toISOString().slice(0, 10) + ' 23:00:00',
			};
			console.log('Videos using date change');
			console.log(data);
			const res = await axios.post(
				'https://api.reflective.ai/hazard/videos',
				data
			);
			console.log(res.data);
			sethazardVideos(res.data.hazard_zone_violations);
			setLoading(false);
		}
		if (hazardZoneCameraStartDate !== undefined) fetchMetrics();
	}, [go]);

	/////////////////////// Draw polygon///////////////////

	useEffect(() => {
		if (selected) {
			//trRef.current.nodes([polyRef.current]);
			//trRef.current.getLayer().batchDraw();
		}

		if (polyRef.current) {
			polyRef.current.zIndex(0);
		}

		if (circleRef.current) {
			circleRef.current.zIndex(1);
		}
	}, [selected]);

	function handleMouseDownPoly(e) {
		const clickedOnPoly = e.target instanceof Konva.Line;
		if (clickedOnPoly) {
			setSelected(true);
		}

		if (e.target === e.target.getStage()) {
			setSelected(false);
		}
	}

	function handleCircleDrag(e, circleX, circleY) {
		const newPoints = [...points];

		// Changing the points state with new points while dragging the circle
		for (let i = 0; i < points.length; i++) {
			if (points[i] === circleX && points[i + 1] === circleY) {
				newPoints[i] = e.target.x();
				newPoints[i + 1] = e.target.y();
				break;
			}
		}

		setPoints(newPoints);
	}

	function handlePolyDrag(e) {
		const absolutePoints = [];

		const points = polyRef.current.points();
		const transform = polyRef.current.getAbsoluteTransform();

		let i = 0;
		while (i < points.length) {
			const point = {
				x: points[i],
				y: points[i + 1],
			};
			absolutePoints.push(transform.point(point));
			i = i + 2;
		}

		const newPoints = [];
		for (let val of absolutePoints) {
			newPoints.push(val.x);
			newPoints.push(val.y);
		}

		setPoints(newPoints);
		e.target.position({ x: 0, y: 0 });
		e.target.scale({ x: 1, y: 1 });

		return newPoints;
	}

	///////////////////////////// Free Draw//////////////////////

	const [tool, setTool] = React.useState('pen');
	const [lines, setLines] = React.useState([]);
	const isDrawing = React.useRef(false);

	const handleMouseDown = (e) => {
		isDrawing.current = true;
		const pos = e.target.getStage().getPointerPosition();
		setLines([...lines, { tool, points: [pos.x, pos.y] }]);
	};

	const handleMouseMove = (e) => {
		// no drawing - skipping
		if (!isDrawing.current) {
			return;
		}
		const stage = e.target.getStage();
		const point = stage.getPointerPosition();
		let lastLine = lines[lines.length - 1];
		// add point
		lastLine.points = lastLine.points.concat([point.x, point.y]);

		// replace last
		lines.splice(lines.length - 1, 1, lastLine);
		setLines(lines.concat());
	};

	const handleMouseUp = () => {
		isDrawing.current = false;
	};

	//////////////// Camera and Dates of Hazard Zone //////////////////////
	// Dates
	const [cameraStartDate, setcameraStartDate] = useState(new Date());
	const [cameraEndDate, setcameraEndDate] = useState(new Date());

	const [startMax, setstartMax] = useState();
	const [startMin, setstartMin] = useState();
	const [endMax, setendMax] = useState();
	const [endMin, setendMin] = useState();

	const [age, setAge] = React.useState('');
	const handleCameraStartDateChange = (date) => {
		setcameraStartDate(date);
		//console.log(cameraStartDate)
	};
	const handleCameraEndDateChange = (date) => {
		setcameraEndDate(date);
		//console.log(cameraEndDate)
	};

	const [disableCameraDate, setdisableCameraDate] = useState(false);

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

	////////////Camera API call/////////////
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
					if (res.data.cameras[0].start_date === null)
						setdisableCameraDate(true);

					onClickHandler(
						-1,
						res.data.cameras[0].end_date,
						res.data.cameras[0].start_date
					);
				}
				//setLoading(false);
			})
			.catch((err) => console.log(err));
	}, []);

	function onClickHandler(index, end, start) {
		setcameraID(index + 2);
		//console.log('1');
		if (end !== null) {
			setcameraEndDate(new Date(end));
		}
		if (end === null) {
			setcameraEndDate(new Date());
		}
		if (start !== null) {
			setcameraStartDate(new Date(start));
			setdisableCameraDate(false);
		}
		if (start === null) {
			setdisableCameraDate(true);
		}

		// end date null
		if (end !== null) {
			var currend = new Date(end);
			var currstart = new Date(start);
			var diff = (currend.getTime() - currstart.getTime()) / (1000 * 3600 * 24);

			if (diff > 7) {
				var curr = new Date(end);
				curr.setDate(curr.getDate() - 6);
				setcameraStartDate(curr);
			}
			if (diff <= 7) {
				setcameraStartDate(currstart);
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
				setcameraStartDate(curr);
			}
			if (diff <= 7) {
				setcameraStartDate(currstart);
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
		<Grid container spacing={2} style={{ marginBottom: '60px' }}>
			<Grid item xs={12}>
				<Paper className={classes.paper} elevation={5}>
					<div className={classes.dates}>
						<Grid container spacing={3}>
							<Grid item lg={4} md={6} xs={12}>
								<FormControl className={classes.formControl}>
									<InputLabel shrink id="demo-controlled-open-select-label">
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
								</FormControl>
							</Grid>
							{disableCameraDate === false && (
								<Grid item lg={4} md={6} xs={12}>
									<Typography
										variant="h6"
										style={{
											color: 'black',
											fontSize: '1rem',
											fontWeight: '400',
										}}
									>
										From Date:
									</Typography>
									<MuiPickersUtilsProvider utils={DateFnsUtils}>
										<KeyboardDatePicker
											style={{ margin: '5px 0px' }}
											margin="normal"
											id="date-picker-dialog"
											format="MM/dd/yyyy"
											/* onChange={() => {
												hazardZoneCameraStartDateChangeHandler();
												generateVideos(
													hazardZoneCameraStartDate,
													hazardZoneCameraEndDate
												);
											}} */
											onChange={hazardZoneCameraStartDateChangeHandler}
											value={hazardZoneCameraStartDate}
											KeyboardButtonProps={{
												'aria-label': 'change date',
											}}
											variant="outlined"
											disabled={disableCameraDate}
											minDate={hazardZoneStartMinDate}
											maxDate={hazardZoneStartMaxDate}
										/>
									</MuiPickersUtilsProvider>
								</Grid>
							)}
							{disableCameraDate === false && (
								<Grid item lg={4} md={6} xs={12}>
									<Typography
										variant="h6"
										style={{
											color: 'black',
											fontSize: '1rem',
											fontWeight: '400',
										}}
									>
										To Date:
									</Typography>
									<MuiPickersUtilsProvider utils={DateFnsUtils}>
										<KeyboardDatePicker
											style={{ margin: '5px 0px' }}
											margin="normal"
											id="date-picker-dialog"
											format="MM/dd/yyyy"
											onChange={hazardZoneCameraEndDateChangeHandler}
											value={hazardZoneCameraEndDate}
											KeyboardButtonProps={{
												'aria-label': 'change date',
											}}
											variant="outlined"
											disabled={disableCameraDate}
											minDate={hazardZoneEndMinDate}
											maxDate={hazardZoneEndMaxDate}
										/>
									</MuiPickersUtilsProvider>
								</Grid>
							)}
						</Grid>
					</div>
				</Paper>
			</Grid>
			{disableCameraDate === false && (
				<Grid item xs={12} style={{ margin: '30px 0px', marginBottom: '15px' }}>
					<CanvasMetrics /* risk={riskValue} */ incidences={entries} />
				</Grid>
			)}
			{/*<Grid item>
				<Paper
					style={{
						height: '424px',
						marginTop: '60px',
						borderRadius: '10px',
						width: '60px',
						padding: '0px',
					}}
					elevation={10}
				>
					<List>
						<ListItem style={{ padding: '0px', marginTop: '10px' }}>
							<ListItemIcon>
								<input
									style={{ display: 'none' }}
									id="icon-button-file"
									onChange={imageUpload}
									multiple
									type="file"
									className="inputFileToLoad"
								/>
								<label htmlFor="icon-button-file">
									<Tooltip title="Add Image">
										<IconButton
											color="primary"
											aria-label="upload picture"
											component="span"
										>
											<AddAPhotoIcon fontSize="large" />
										</IconButton>
									</Tooltip>
								</label>
							</ListItemIcon>
						</ListItem>
						{hazardZoneAvailable === true && addMode === false && (
							<ListItem
								style={{ padding: '0px' }}
								onClick={() => {
									seteditMode(true);
									setaddMode(true);
									var curr = [...coordinates];
									setPoints(curr);
								}}
							>
								<Tooltip title="Edit Hazard Zone">
									<IconButton>
										<EditIcon color="primary" fontSize="large" />
									</IconButton>
								</Tooltip>
							</ListItem>
						)}
						{addMode === true && (
							<ListItem
								style={{ padding: '0px' }}
								onClick={() => setfreeDraw(!freeDraw)}
							>
								<Tooltip
									title={freeDraw === true ? 'Draw Polygon ' : 'Free Draw'}
								>
									<IconButton>
										<SwitchCameraIcon color="primary" fontSize="large" />
									</IconButton>
								</Tooltip>
							</ListItem>
						)}
						{addMode === true && (
							<ListItem style={{ padding: '0px' }} onClick={clearStage}>
								<Tooltip title="Clear">
									<IconButton>
										<CancelIcon color="primary" fontSize="large" />
									</IconButton>
								</Tooltip>
							</ListItem>
						)}
						{addMode === true && freeDraw === false && (
							<ListItem style={{ padding: '0px' }} onClick={undoStage}>
								<Tooltip title="Undo">
									<IconButton>
										<RestorePageIcon color="primary" fontSize="large" />
									</IconButton>
								</Tooltip>
							</ListItem>
						)}

						{freeDraw === true && (
							<ListItem
								style={{ padding: '0px' }}
								onClick={() => setTool('pen')}
							>
								<Tooltip title="Pen">
									<IconButton>
										<BorderColorIcon color="primary" fontSize="large" />
									</IconButton>
								</Tooltip>
							</ListItem>
						)}
						{freeDraw === true && (
							<ListItem
								style={{ padding: '0px' }}
								onClick={() => setTool('eraser')}
							>
								<Tooltip title="Eraser">
									<IconButton>
										<FormatColorResetIcon color="primary" fontSize="large" />
									</IconButton>
								</Tooltip>
							</ListItem>
						)}
						{addMode === true && (
							<ListItem style={{ padding: '0px' }} onClick={undoStage}>
								<Tooltip title="Done ?">
									<IconButton>
										<CheckCircleIcon color="primary" fontSize="large" />
									</IconButton>
								</Tooltip>
							</ListItem>
						)} 
					</List>
				</Paper>
			</Grid> */}
			<Grid item md={7} xs={12}>
				<Grid container style={{ marginBottom: '10px' }}>
					<Grid item xs={9}>
						<Typography
							variant="h5"
							style={{
								textAlign: 'center',
								margin: '10px',
								fontWeight: '400',
								float: 'right',
								marginRight: '60px',
							}}
						>
							{addMode === true
								? 'Create Your Hazard Zone'
								: 'Hazard Zone Monitoring'}
						</Typography>
					</Grid>
				</Grid>

				<Paper
					style={{
						border: '4px solid black',
						borderRadius: '10px',
						width: '728px',
						height: '428px',
						position: 'relative',
					}}
				>
					{videoMode === true && (
						<div style={{ position: 'relative' }}>
							{' '}
							<video
								width="720px"
								height="416px"
								controls={true}
								key={videoSrc}
								/* poster={
									'https://api.reflective.ai/media' +
									'/home/ubuntu/Safety_Product/videos/1/4/2020-08-17 00:00:00/2020-08-17 05:37:34--sd_violations--142--43.jpg'
								} */
								/*onClick={() => {
										handleOpen();
										setModalVideo(
											'https://api.reflective.ai/media' +
												phy.data_path
										);
									}} */
								style={{
									outline: 'none',
									position: 'absolute',
									marginBottom: '10px',
								}}
							>
								<source src={videoSrc} />
							</video>
							<Button
								variant="text"
								color="primary"
								style={{ position: 'absolute', right: '0' }}
								onClick={() => {
									setaddMode(false);
									setvideoMode(false);
								}}
							>
								<CancelIcon color="primary" fontSize="large" />
							</Button>
						</div>
					)}
					{/*//////////////////////// Display just the image and the polygon /////////////////*/}
					{addMode === false &&
						hazardZoneAvailable === true &&
						videoMode === false &&
						freeDraw === false && (
							<Stage
								width={720}
								height={420}
								//onClick={stageClick}
								ref={stageRefFree}
								onMouseDown={handleMouseDownPoly}
								//style={{ cursor: 'pointer' }}
							>
								<Layer>
									<URLImage src={'https://api.reflective.ai/image' + imgSrc} />
								</Layer>
								<Layer>
									{_.chunk(coordinates, 2).map((coord, i) => (
										<Circle
											ref={circleRef}
											x={coord[0]}
											y={coord[1]}
											key={i}
											radius={7}
											fill="#3f50b5"
											/* rotateEnabled={false}
										draggable
										onDragMove={(e) => {
											handleCircleDrag(e, coord[0], coord[1]);
										}} */
										/>
									))}

									<Line
										closed
										//draggable
										ref={polyRef}
										stroke="#ba000d"
										strokeWidth={3}
										points={coordinates}
										/* onDragEnd={handlePolyDrag}
									onTransformEnd={handlePolyDrag} */
									/>
									{/* {selected && <Transformer ref={trRef} rotateEnabled={false} />} */}
								</Layer>
							</Stage>
						)}
					{/*////////////////////////////// Display just the image //////////////////////////////*/}
					{addMode === false &&
						hazardZoneAvailable === false &&
						videoMode === false &&
						freeDraw === false && (
							<Stage
								width={720}
								height={420}
								//onClick={stageClick}
								ref={stageRefFree}
								onMouseDown={handleMouseDownPoly}
								//style={{ cursor: 'pointer' }}
							>
								<Layer>
									<URLImage src={'https://api.reflective.ai/image' + imgSrc} />
								</Layer>
							</Stage>
						)}
					{/*/////////////////////////////////////////Edit the polygon ///////////////////*/}
					{editMode === true && (
						<Stage
							width={720}
							height={420}
							onClick={stageClick}
							ref={stageRefFree}
							onMouseDown={handleMouseDownPoly}
							style={{ cursor: 'pointer' }}
						>
							<Layer>
								<URLImage src={'https://api.reflective.ai/image' + imgSrc} />
							</Layer>
							<Layer>
								{_.chunk(points, 2).map((coord, i) => (
									<Circle
										ref={circleRef}
										x={coord[0]}
										y={coord[1]}
										key={i}
										radius={7}
										fill="#3f50b5"
										rotateEnabled={false}
										draggable
										onDragMove={(e) => {
											handleCircleDrag(e, coord[0], coord[1]);
										}}
									/>
								))}

								<Line
									closed
									draggable
									ref={polyRef}
									stroke={hazardColor === '' ? '#ba000d' : hazardColor}
									strokeWidth={3}
									points={points}
									onDragEnd={handlePolyDrag}
									onTransformEnd={handlePolyDrag}
								/>
								{/* {selected && <Transformer ref={trRef} rotateEnabled={false} />} */}
							</Layer>
						</Stage>
					)}
					{/*/////////////////////////////////////////Editable and Drawable polygon ///////////////////*/}
					{addMode === true &&
						hazardZoneAvailable === false &&
						videoMode === false &&
						freeDraw === false && (
							<Stage
								width={720}
								height={420}
								onClick={stageClick}
								ref={stageRefFree}
								onMouseDown={handleMouseDownPoly}
								style={{ cursor: 'pointer' }}
							>
								<Layer>
									<URLImage src={'https://api.reflective.ai/image' + imgSrc} />
								</Layer>
								<Layer>
									{_.chunk(points, 2).map((coord, i) => (
										<Circle
											ref={circleRef}
											x={coord[0]}
											y={coord[1]}
											key={i}
											radius={7}
											fill="#3f50b5"
											rotateEnabled={false}
											draggable
											onDragMove={(e) => {
												handleCircleDrag(e, coord[0], coord[1]);
											}}
										/>
									))}

									<Line
										closed
										draggable
										ref={polyRef}
										stroke={hazardColor === '' ? '#ba000d' : hazardColor}
										strokeWidth={3}
										points={points}
										onDragEnd={handlePolyDrag}
										onTransformEnd={handlePolyDrag}
									/>
									{/* {selected && <Transformer ref={trRef} rotateEnabled={false} />} */}
								</Layer>
							</Stage>
						)}
					{addMode === true &&
						hazardZoneAvailable === false &&
						videoMode === false &&
						freeDraw === true && (
							<div>
								<Stage
									width={720}
									height={420}
									onMouseDown={handleMouseDown}
									onMousemove={handleMouseMove}
									onMouseup={handleMouseUp}
									ref={stageRef}
									style={{ cursor: 'pointer' }}
								>
									<Layer>
										<URLImage
											src={'https://api.reflective.ai/image' + imgSrc}
										/>
									</Layer>
									<Layer>
										{lines.map((line, i) => (
											<Line
												key={i}
												points={line.points}
												stroke={hazardColor === '' ? '#ba000d' : hazardColor}
												strokeWidth={5}
												tension={0.5}
												lineCap="round"
												globalCompositeOperation={
													line.tool === 'eraser'
														? 'destination-out'
														: 'source-over'
												}
											/>
										))}
									</Layer>
								</Stage>
							</div>
						)}
				</Paper>
			</Grid>
			{/* ///////////////////////////////////// Right Grid ///////////////////////////////////////////*/}
			{/* //////////////////////////////////////Hazard Zone Metrics and Videos /////////////////////////////////*/}
			<Grid item md={1}></Grid>
			{hazardZoneAvailable === true && addMode === false && (
				<Grid item xs={6} sm={3} md={4}>
					<Paper
						style={{
							height: '424px',
							marginTop: '60px',
							borderRadius: '10px',
							padding: '7px',
							minWidth: '250px',
							position: 'relative',
						}}
						elevation={10}
					>
						<Typography
							variant="h5"
							style={{
								fontWeight: '400',
								textAlign: 'center',
								marginBottom: '15px',
							}}
						>
							Alert Visuals
						</Typography>

						{/* <Divider style={{ margin: '20px 0px' }} /> */}
						<div
							style={{
								maxHeight: '85%',
								backgroundColor: 'white',
								overflow: 'auto',
								position: 'relative',
							}}
						>
							{hazardVideos.length === 0 && (
								<Typography
									variant="h5"
									style={{
										margin: 'auto',
										marginTop: '140px',
										textAlign: 'center',
										fontWeight: '600',
									}}
								>
									No Observation
								</Typography>
							)}
							{hazardVideos.map((zone, index) => (
								<div
									key={index}
									onClick={() => {
										setvideoSrc(
											'https://api.reflective.ai/media' + zone.data_path
										);
										setvideoMode(true);
									}}
									style={{ cursor: 'pointer' }}
								>
									<div
										style={{
											height: '64px',
											borderRadius: '10px',
											width: '98%',
											margin: 'auto',
											marginBottom: '12px',
											marginTop: '5px',
										}}
									>
										<Grid container spacing={1}>
											<Grid item xs={4}>
												<div style={{ position: 'relative' }}>
													<img
														width="90%"
														height="64px"
														src={
															'https://api.reflective.ai/media' +
															zone.thumbnail_path
														}
														style={{ position: 'absolute' }}
													></img>
													<VideocamIcon
														fontSize="small"
														color="primary"
														style={{
															position: 'absolute',
															left: '2',
															top: '2',
														}}
													/>
												</div>
											</Grid>
											<Grid item xs={8} style={{ fontSize: '18px' }}>
												<Typography
													variant="body1"
													style={{ fontWeight: '300' }}
												>
													{zone.datetime.substring(0, 16)}
												</Typography>
												<Typography variant="body2">
													{zone.datetime.substring(16, 25)}
												</Typography>
											</Grid>
										</Grid>
									</div>
									<Divider style={{ margin: '15px 0px' }} />
								</div>
							))}
						</div>
					</Paper>
				</Grid>
			)}{' '}
			{/* //////////////////////////////////////Add Hazard Button ////////////////////////////////// */}
			{addMode === false && hazardZoneAvailable === false && (
				<Grid item xs={6} sm={3} md={4}>
					<Paper
						style={{
							height: '424px',
							marginTop: '60px',
							borderRadius: '10px',
							padding: '20px',
							minWidth: '150px',
							position: 'relative',
						}}
						elevation={10}
					>
						<Typography
							variant="h5"
							style={{ fontWeight: '600', textAlign: 'center' }}
						>
							Hazard Zones
						</Typography>
						<Button
							variant="contained"
							color="primary"
							onClick={() => {
								setaddMode(true);
							}}
							style={{
								margin: '0',
								position: 'absolute',
								top: '50%',
								left: '50%',
								msTransform: 'translate(-50%, -50%)',
								transform: 'translate(-50%, -50%)',
							}}
						>
							Add Hazard Zone
						</Button>{' '}
					</Paper>
				</Grid>
			)}
			{/* //////////////////////////////////////Add Hazard Zone Form ////////////////////////////////// */}
			{addMode === true && (
				<Grid item xs={6} sm={3} md={4}>
					<Paper
						style={{
							height: '424px',
							marginTop: '60px',
							borderRadius: '10px',
							padding: '20px 8px',
							minWidth: '150px',
							position: 'relative',
						}}
						elevation={10}
					>
						<Typography
							variant="h5"
							style={{ fontWeight: '600', textAlign: 'center' }}
						>
							Edit Hazard Zone
						</Typography>
						<form
							style={{ width: '100%', padding: '0px 22px' }}
							noValidate
							autoComplete="off"
						>
							<div style={{ marginTop: '30px' }}>
								<TextField
									id="standard-basic"
									label="Enter Name"
									style={{ width: '100%' }}
									onChange={hazardZoneNameChangeHandler}
									name="name"
									value={hazardName}
								/>
							</div>
							<div style={{ marginTop: '30px' }}>
								<Grid container spacing={3}>
									<Grid item xs={6}>
										<MuiPickersUtilsProvider utils={DateFnsUtils}>
											<label style={{ fontSize: '12px' }}>
												Monitoring Start Date
											</label>
											<KeyboardDatePicker
												style={{ margin: '5px 0px' }}
												margin="normal"
												id="date-picker-dialog"
												format="MM/dd/yyyy"
												onChange={handleCameraStartDateChange}
												value={cameraStartDate}
												KeyboardButtonProps={{
													'aria-label': 'change date',
												}}
												variant="outlined"
												minDate={startMin}
												maxDate={cameraEndDate}
											/>
										</MuiPickersUtilsProvider>
									</Grid>

									<Grid item xs={6}>
										<MuiPickersUtilsProvider utils={DateFnsUtils}>
											<label style={{ fontSize: '12px' }}>
												Monitoring End Date
											</label>
											<KeyboardDatePicker
												style={{ margin: '5px 0px' }}
												margin="normal"
												id="date-picker-dialog"
												format="MM/dd/yyyy"
												onChange={handleCameraEndDateChange}
												value={cameraEndDate}
												KeyboardButtonProps={{
													'aria-label': 'change date',
												}}
												variant="outlined"
												minDate={endMin}
												maxDate={endMax}
											/>
										</MuiPickersUtilsProvider>
									</Grid>
								</Grid>
							</div>
							{/* 							<div style={{ marginTop: '30px' }}>
								<FormControl style={{ width: '100%' }}>
									<InputLabel id="demo-simple-select-label">
										Select Zone Color
									</InputLabel>
									<Select
										labelId="demo-simple-select-label"
										id="demo-simple-select"
										value={hazardColor}
										onChange={hazardZoneColorChangeHandler}
									>
										<MenuItem value={'red'}>Red</MenuItem>
										<MenuItem value={'orange'}>Orange</MenuItem>
										<MenuItem value={'blue'}>Blue</MenuItem>
									</Select>
								</FormControl>
							</div> */}
							{/* 							<div style={{ marginTop: '30px' }}>
								<ColorPicker
									name="color"
									defaultValue="Hazard Zone Color "
									value={hazardColor}
									onChange={(color) => sethazardColor(color)}
									style={{ width: '100%' }}
								/>
							</div> */}
							<div style={{ marginTop: '30px' }}>
								<Grid container spacing={3} style={{ marginBottom: '6px' }}>
									<Grid item xs={10}>
										<Typography>Hazard Zone Color</Typography>
									</Grid>
									<Grid item xs={2}>
										<div
											style={{
												width: '40px',
												height: '20px',
												backgroundColor:
													hazardColor === '' ? '#ba000d' : hazardColor,
												right: '0',
												borderRadius: '2px',
											}}
										></div>
									</Grid>
								</Grid>

								<HuePicker
									color={hazardColor}
									onChange={(color) => {
										sethazardColor(`${color.hex}`);
									}}
									width="100%"
								/>
							</div>
						</form>
						<Button
							variant="contained"
							color="primary"
							onClick={createHazardZoneClickHandler}
							style={{
								margin: '0',
								position: 'absolute',
								top: '90%',
								left: '50%',
								msTransform: 'translate(-50%, -50%)',
								transform: 'translate(-50%, -50%)',
							}}
						>
							Create Hazard Zone
						</Button>{' '}
					</Paper>
				</Grid>
			)}
		</Grid>
	);
};

export default withRouter(Canvas);

/* 	function addHazardZone() {
		sethazardZones([
			...hazardZones,
			{
				name: hazardName,
				color: hazardColor,
				startDate: hazardStartDate,
				endDate: hazardEndDate,
			},
		]);
	} */

/* 	useEffect(() => {
		console.log(hazardName);
		console.log(hazardColor);
		console.log(hazardStartDate);
		console.log(hazardEndDate);
	}, [hazardName, hazardColor]); */

{
	/* 					<Grid item xs={3}>
						<div>
							<FormControl style={{ width: '100%' }}>
								<InputLabel id="demo-simple-select-label">
									Select Hazard Zone
								</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									label="Days To Monitor"
									//value={hazardZoneSelect}
									//onChange={hazardZoneSelectChange}
								>
									{hazardZones.map((zone, index) => (
										<MenuItem value={zone.name}>{zone.name}</MenuItem>
									))}
								</Select>
							</FormControl>
						</div>
					</Grid> */
}
