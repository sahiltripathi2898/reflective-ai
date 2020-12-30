import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Konva from 'konva';
import ColorPicker from 'material-ui-color-picker';
import { Stage, Layer, Line, Circle, Image, Text } from 'react-konva';
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
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import IconButton from '@material-ui/core/IconButton';
import RestorePageIcon from '@material-ui/icons/RestorePage';
import CancelIcon from '@material-ui/icons/Cancel';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import FormatColorResetIcon from '@material-ui/icons/FormatColorReset';
import SwitchCameraIcon from '@material-ui/icons/SwitchCamera';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import EditIcon from '@material-ui/icons/Edit';

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

//////////// Main Function/////////////////

const Canvas = (props) => {
	const {
		cID,
		sDate,
		eDate,
		startMinDate,
		startMaxDate,
		endMinDate,
		endMaxDate,
	} = props;
	/////// Drawing refs
	const polyRef = React.useRef();
	const circleRef = React.useRef();

	const [loading, setLoading] = useState(true);

	const [selected, setSelected] = useState(false);

	/////// Video Mode
	const [videoMode, setvideoMode] = useState(false);
	const [videoSrc, setvideoSrc] = useState('');

	//////// Edit Mode
	const [editMode, seteditMode] = useState(false);

	/////// Co-ordinates
	const [points, setPoints] = useState([]);

	/////// Co-ordinates from backend if hazard zone already present
	const [coordinates, setCoordinates] = useState([]);

	////// Image Source
	const [imgSrc, setimgSrc] = useState('');

	////// Show editing icons
	const [addMode, setaddMode] = useState(false);

	////// Hazard Zone Available
	const [hazardZoneAvailable, sethazardZoneAvailable] = useState(false);

	/////// Free Draw Mode
	const [freeDraw, setfreeDraw] = useState(false);

	////// Hazard Zone values
	const [hazardName, sethazardName] = useState('');
	const [hazardColor, sethazardColor] = useState('#ba000d');
	// Dates
	const [hazardStartDate, setstartDate] = useState(new Date());
	const [hazardEndDate, setendDate] = useState(new Date());

	const hazardZoneColorChangeHandler = (event) => {
		sethazardColor(event.target.value);
	};

	const hazardZoneNameChangeHandler = (event) => {
		sethazardName(event.target.value);
	};

	/* 	const hazardZoneStartDateChangeHandler = (event) => {
		sethazardStartDate(event.target.value);
	};

	const hazardZoneEndDateChangeHandler = (event) => {
		sethazardEndDate(event.target.value);
	}; */

	const [zoneViolation, setzoneViolation] = useState([
		{
			name: 'Zone 1',
			duration: '04:39 mins',
		},
		{
			name: 'Zone 2',
			duration: '01:11 mins',
		},
		{
			name: 'Zone 3',
			duration: '00:20 mins',
		},
		/* 		{
			name: 'Zone 3',
			duration: '00:20 mins',
		},
		{
			name: 'Zone 3',
			duration: '00:20 mins',
		},
		{
			name: 'Zone 3',
			duration: '00:20 mins',
		}, */
	]);

	const [fire, setFire] = useState(false);

	/////////////////////API calls
	useEffect(() => {
		const data = {
			project_id: Number(localStorage.getItem('projectID')),
			camera_id: cID,
			company_id: Number(localStorage.getItem('company_id')),
		};
		//console.log(data);

		axios
			.post('https://api.reflective.ai/hazard_zone', data)
			.then((res) => {
				console.log(res.data);
				if (res.data.hazard_flag === 0) {
					sethazardZoneAvailable(false);
				}
				if (res.data.hazard_flag === 1) {
					console.log('2');
					sethazardZoneAvailable(true);
					var curr = res.data.coordinates;
					var stored = [];
					for (var i = 0; i < curr.length; i++) {
						stored.push(curr[i][0]);
						stored.push(curr[i][1]);
					}
					//console.log(stored);
					setCoordinates(stored);
				}
				setimgSrc(res.data.src);
				setLoading(false);
			})
			.catch((err) => console.log(err));
	}, [fire]);

	////// Button Click Handlers
	function createHazardZoneClickHandler() {
		var curr = [...points];
		var finalCoordinates = [];
		var pair = [];
		//pair.push(curr[0]);
		for (var i = 0; i < curr.length - 1; ) {
			pair.push(curr[i]);
			pair.push(curr[i + 1]);
			finalCoordinates.push(pair);
			pair = [];
			i += 2;
		}
		/// Set points and everything to backend /register_hazard_zone
		const newdata = {
			project_id: Number(localStorage.getItem('projectID')),
			camera_id: cID,
			company_id: Number(localStorage.getItem('company_id')),
			name: hazardName,
			color: hazardColor,
			start_date: hazardStartDate.toISOString().slice(0, 10) + ' 00:00:00',
			end_date: hazardEndDate.toISOString().slice(0, 10) + ' 00:00:00',
			coordinates: finalCoordinates,
		};
		axios
			.post('https://api.reflective.ai/register_hazard_zone', newdata)
			.then((res) => {
				//console.log(res.data);
				console.log('1');
			})
			.catch((err) => {
				console.log(err);
			});

		seteditMode(false);
		setaddMode(false);
		sethazardZoneAvailable(true);
		setFire(!fire);
		setPoints([]);
	}

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

	const handleStartDateChange = (date) => {
		setstartDate(date);
		//console.log(sDate)
	};
	const handleEndDateChange = (date) => {
		setendDate(date);
		//console.log(endDate)
	};

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

	if (loading) return <Spinner />;

	return (
		<Grid container spacing={2} style={{ marginBottom: '60px' }}>
			<Grid item>
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
						{/*{addMode === true && (
							<ListItem style={{ padding: '0px' }} onClick={undoStage}>
								<Tooltip title="Done ?">
									<IconButton>
										<CheckCircleIcon color="primary" fontSize="large" />
									</IconButton>
								</Tooltip>
							</ListItem>
						)} */}
					</List>
				</Paper>
			</Grid>
			<Grid item xl={7}>
				<Grid container style={{ marginBottom: '10px' }}>
					<Grid item xs={9}>
						<Typography
							variant="h5"
							style={{
								textAlign: 'center',
								margin: '10px',
								fontWeight: '600',
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
						width: '720px',
						height: '420px',
						position: 'relative',
					}}
				>
					{videoMode === true && (
						<div
							style={{ width: '100%', height: '100%', position: 'relative' }}
						>
							{' '}
							<video
								width="100%"
								height="99%"
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
								style={{
									outline: 'none',
									position: 'absolute',
								}}
							>
								<source
									src={
										'https://api.reflective.ai/media' +
										'/home/ubuntu/Safety_Product/videos/1/4/2020-08-17 00:00:00/2020-08-17 05:37:34--sd_violations--142--43.mp4'
									}
								/>
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
								width={714}
								height={414}
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
								width={714}
								height={414}
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
							width={714}
							height={414}
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
								width={714}
								height={414}
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
										stroke="#ba000d"
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
									width={714}
									height={414}
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
												stroke="#df4b26"
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
			{hazardZoneAvailable === true && addMode === false && (
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
						{/* <Typography
							variant="h5"
							style={{ fontWeight: '600', textAlign: 'center' }}
						>
							Hazard Zones
						</Typography> */}
						<CanvasMetrics time={14} incidences={22} />
						<Divider style={{ margin: '20px 0px' }} />
						<div
							style={{
								maxHeight: '240px',
								backgroundColor: 'white',
								//overflow: 'auto',
							}}
						>
							{zoneViolation.map((zone, index) => (
								<Paper
									style={{
										height: '50px',
										borderRadius: '10px',
										width: '98%',
										margin: 'auto',
										marginBottom: '12px',
										marginTop: '5px',
									}}
									elevation={6}
									key={index}
								>
									<Grid container>
										<Grid item xs={4}>
											<ListItem
												style={{ margin: '0px 0px 0px 10px', padding: '0px' }}
												//onClick={() => setTool('pen')}
											>
												<Tooltip title="Play Video">
													<IconButton
														style={{
															padding: '0px',
															margin: '7px 0px 0px 10px',
														}}
														onClick={() => {
															setvideoMode(true);
														}}
													>
														<PlayCircleFilledIcon
															color="primary"
															fontSize="large"
														/>
													</IconButton>
												</Tooltip>
											</ListItem>
										</Grid>
										<Grid
											item
											xs={4}
											style={{ marginTop: '12px', fontSize: '18px' }}
										>
											{zone.name}
										</Grid>
										<Grid
											item
											xs={4}
											style={{ marginTop: '12px', fontSize: '18px' }}
										>
											{zone.duration}
										</Grid>
									</Grid>
								</Paper>
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
												minDate={startMinDate}
												maxDate={startMaxDate}
											/>
										</MuiPickersUtilsProvider>
									</Grid>

									<Grid item xs={6}>
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
												minDate={endMinDate}
												maxDate={endMaxDate}
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
							<div style={{ marginTop: '30px' }}>
								<ColorPicker
									name="color"
									defaultValue="Hazard Zone Color "
									value={hazardColor}
									onChange={(color) => sethazardColor(color)}
									style={{ width: '100%' }}
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
