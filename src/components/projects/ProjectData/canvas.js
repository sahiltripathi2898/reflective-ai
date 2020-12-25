import React, { useState, useEffect } from 'react';
import Konva from 'konva';
import { Stage, Layer, Line, Circle, Image, Text } from 'react-konva';
import {
	Button,
	Typography,
	Grid,
	Paper,
	List,
	ListItemIcon,
	ListItem,
	Tooltip,
	ButtonGroup,
	TextField,
	InputLabel,
	Select,
	MenuItem,
	FormControl,
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import IconButton from '@material-ui/core/IconButton';
import RestorePageIcon from '@material-ui/icons/RestorePage';
import CancelIcon from '@material-ui/icons/Cancel';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import CreateIcon from '@material-ui/icons/Create';
import FormatColorResetIcon from '@material-ui/icons/FormatColorReset';
import SwitchCameraIcon from '@material-ui/icons/SwitchCamera';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DeleteIcon from '@material-ui/icons/Delete';

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

const Canvas = (props) => {
	const polyRef = React.useRef();
	const circleRef = React.useRef();

	const [freeDraw, setfreeDraw] = useState(false);

	const [points, setPoints] = useState([]);
	const [selected, setSelected] = useState(false);

	////// Show editing icons
	const [editMode, seteditMode] = useState(false);

	////// Hazard Zone Array
	const [hazardZones, sethazardZones] = useState([
		{
			name: 'Zone 1',
			color: 'red',
			startDate: '',
			endDate: '',
		},
		{
			name: 'Zone 2',
			color: 'orange',
			startDate: '',
			endDate: '',
		},
	]);

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

	const stageRef = React.useRef(null);
	const stageRefFree = React.useRef(null);

	const [imgSrc, setimgSrc] = useState('');

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

	////// Hazard Zone values
	const [hazardName, sethazardName] = useState('');
	const [hazardColor, sethazardColor] = useState('');
	const [hazardStartDate, sethazardStartDate] = useState('');
	const [hazardEndDate, sethazardEndDate] = useState('');

	const hazardZoneColorChangeHandler = (event) => {
		sethazardColor(event.target.value);
	};

	const hazardZoneNameChangeHandler = (event) => {
		sethazardName(event.target.value);
	};

	const hazardZoneStartDateChangeHandler = (event) => {
		sethazardStartDate(event.target.value);
	};

	const hazardZoneEndDateChangeHandler = (event) => {
		sethazardEndDate(event.target.value);
	};

	function addHazardZone() {
		sethazardZones([
			...hazardZones,
			{
				name: hazardName,
				color: hazardColor,
				startDate: hazardStartDate,
				endDate: hazardEndDate,
			},
		]);
	}

	useEffect(() => {
		console.log(hazardName);
		console.log(hazardColor);
		console.log(hazardStartDate);
		console.log(hazardEndDate);
	}, [hazardName, hazardColor]);

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
						{/* <ListItem style={{ padding: '0px' }} onClick={() => setimgSrc('')}>
							<IconButton>
								<DeleteIcon color="primary" fontSize="large" />
							</IconButton>
						</ListItem> */}
						{editMode === true && (
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
						{editMode === true && (
							<ListItem style={{ padding: '0px' }} onClick={clearStage}>
								<Tooltip title="Clear">
									<IconButton>
										<CancelIcon color="primary" fontSize="large" />
									</IconButton>
								</Tooltip>
							</ListItem>
						)}
						{editMode === true && freeDraw === false && (
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
										<CreateIcon color="primary" fontSize="large" />
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
						{editMode === true && (
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
							{editMode === true
								? 'Create Your Hazard Zone'
								: 'Hazard Zone Monitoring'}
						</Typography>
					</Grid>
					<Grid item xs={3}>
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
					{freeDraw === false && (
						<Stage
							width={714}
							height={414}
							onClick={stageClick}
							ref={stageRefFree}
							onMouseDown={handleMouseDownPoly}
							style={{ cursor: 'pointer' }}
						>
							<Layer>
								<URLImage src={imgSrc} />
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
					{freeDraw === true && (
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
									<URLImage src={imgSrc} />
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
			{editMode === false ? (
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
								seteditMode(true);
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
			) : (
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
							Hazard Zone 1
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
										<TextField
											type="date"
											style={{ width: '100%' }}
											label="Start Date"
											InputLabelProps={{ shrink: true }}
											name="startDate"
											value={hazardStartDate}
											onChange={hazardZoneStartDateChangeHandler}
										></TextField>
									</Grid>
									<Grid item xs={6}>
										<TextField
											type="date"
											style={{ width: '100%' }}
											label="End Date"
											InputLabelProps={{ shrink: true }}
											name="endDate"
											value={hazardEndDate}
											onChange={hazardZoneEndDateChangeHandler}
										></TextField>
									</Grid>
								</Grid>
							</div>
							<div style={{ marginTop: '30px' }}>
								<FormControl style={{ width: '100%' }}>
									<InputLabel id="demo-simple-select-label">
										Select Hazard Zone Color
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
							</div>
						</form>
						<Button
							variant="contained"
							color="primary"
							onClick={() => {
								seteditMode(false);
								addHazardZone();
							}}
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
