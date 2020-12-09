import React, { useState, useEffect } from 'react';
import Konva from 'konva';
import { Stage, Layer, Line, Circle, Transformer, Image } from 'react-konva';
import { Button, Typography } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

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
	const trRef = React.useRef();
	const polyRef = React.useRef();
	const circleRef = React.useRef();

	const [points, setPoints] = useState([]);
	const [selected, setSelected] = useState(false);

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

	function handleMouseDown(e) {
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
	const layerRef = React.useRef(null);
	const [rectCount, setrectCount] = useState(0);
	const [rectdelcount, setrectdelcount] = useState(0);

	function createRect() {}

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
		var file = document.getElementById('inputFileToLoad').files;
		setimgSrc(URL.createObjectURL(file[0]));
	}

	function clearStage() {
		setPoints([]);
	}
	function undoStage() {
		var old = [...points];
		old.pop();
		old.pop();
		setPoints(old);
	}
	/* 	useEffect(() => {
		console.log(points);
	}, [points]); */

	return (
		<div style={{ margin: 'auto' }}>
			<Typography
				variant="h5"
				style={{ textAlign: 'center', margin: '10px', fontWeight: '600' }}
			>
				Select Points to Draw a Polygon
			</Typography>

			<Stage
				width={720}
				height={420}
				style={{ border: '4px solid black', borderRadius: '10px' }}
				onClick={stageClick}
				ref={stageRef}
				onMouseDown={handleMouseDown}
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
							radius={9}
							fill="blue"
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
						stroke="red"
						strokeWidth={3}
						points={points}
						onDragEnd={handlePolyDrag}
						onTransformEnd={handlePolyDrag}
					/>
					{/* {selected && <Transformer ref={trRef} rotateEnabled={false} />} */}
				</Layer>
			</Stage>
			<div>
				<input
					type="file"
					id="inputFileToLoad"
					onChange={imageUpload}
					multiple
					style={{ marginLeft: '10px' }}
				/>
				<Button
					variant="contained"
					color="primary"
					onClick={undoStage}
					style={{ marginLeft: '305px', marginTop: '5px' }}
				>
					Undo
				</Button>{' '}
				<Button
					variant="contained"
					color="secondary"
					onClick={clearStage}
					style={{ marginTop: '5px' }}
				>
					Clear
				</Button>
			</div>
		</div>
	);
};

export default withRouter(Canvas);

// const Rectangle = ({ shapeProps, isSelected, onSelect, onChange }) => {
// 	const shapeRef = React.useRef();
// 	const trRef = React.useRef();

// 	React.useEffect(() => {
// 		if (isSelected) {
// 			// we need to attach transformer manually
// 			trRef.current.nodes([shapeRef.current]);
// 			trRef.current.getLayer().batchDraw();
// 		}
// 	}, [isSelected]);

// 	return (
// 		<React.Fragment>
// 			<Rect
// 				onClick={onSelect}
// 				onTap={onSelect}
// 				ref={shapeRef}
// 				{...shapeProps}
// 				draggable
// 				onDragEnd={(e) => {
// 					onChange({
// 						...shapeProps,
// 						x: e.target.x(),
// 						y: e.target.y(),
// 					});
// 				}}
// 				onTransformEnd={(e) => {
// 					// transformer is changing scale of the node
// 					// and NOT its width or height
// 					// but in the store we have only width and height
// 					// to match the data better we will reset scale on transform end
// 					const node = shapeRef.current;
// 					const scaleX = node.scaleX();
// 					const scaleY = node.scaleY();

// 					// we will reset it back
// 					node.scaleX(1);
// 					node.scaleY(1);
// 					onChange({
// 						...shapeProps,
// 						x: node.x(),
// 						y: node.y(),
// 						// set minimal value
// 						width: Math.max(5, node.width() * scaleX),
// 						height: Math.max(node.height() * scaleY),
// 					});
// 				}}
// 			/>
// 			{isSelected && (
// 				<Transformer
// 					ref={trRef}
// 					boundBoxFunc={(oldBox, newBox) => {
// 						// limit resize
// 						if (newBox.width < 5 || newBox.height < 5) {
// 							return oldBox;
// 						}
// 						return newBox;
// 					}}
// 				/>
// 			)}
// 		</React.Fragment>
// 	);
// };

// const Canvas = (props) => {
// 	const { history } = props;

// 	const [rectangles, setRectangles] = React.useState([
// 		// {
// 		// 	x: 10,
// 		// 	y: 10,
// 		// 	width: 100,
// 		// 	height: 100,
// 		// 	id: 'rect1',
// 		// 	stroke: 'red',
// 		// },
// 		// {
// 		// 	x: 70,
// 		// 	y: 100,
// 		// 	width: 100,
// 		// 	height: 100,
// 		// 	id: 'rect1',
// 		// 	stroke: 'red',
//         // },
// 	]);
// 	const [selectedId, selectShape] = React.useState(null);

// 	useEffect(() => {
// 		console.log(rectangles);
// 	}, [rectangles]);

// 	const checkDeselect = (e) => {
// 		// deselect when clicked on empty area
// 		const clickedOnEmpty = e.target === e.target.getStage();
// 		if (clickedOnEmpty) {
// 			selectShape(null);
// 		}
// 	};

// 	const stageRef = React.useRef(null);
// 	const layerRef = React.useRef(null);
// 	const [rectCount, setrectCount] = useState(0);
// 	const [rectdelcount, setrectdelcount] = useState(0);

// 	function createRect() {
// 		let old = [...rectangles];
// 		old[rectCount] = {
// 			x: 10,
// 			y: 10,
// 			width: 100,
// 			height: 100,
// 			id: 'rect1',
// 			stroke: 'red',
// 		};
// 		setRectangles(old);
// 		setrectCount((old) => old + 1);
// 	}

// 	const [imgSrc, setimgSrc] = useState('');

// 	function imageUpload(e) {
// 		var file = document.getElementById('inputFileToLoad').files;
// 		setimgSrc(URL.createObjectURL(file[0]));
// 	}

// 	function clearStage() {
// 		let old = [...rectangles];

// 		old[rectdelcount] = {
// 			x: 0,
// 			y: 0,
// 			width: 0,
// 			height: 0,
// 			id: 'rect1',
// 			stroke: 'red',
// 		};
// 		setRectangles(old);
// 		setrectdelcount((old) => old + 1);
// 	}

// 	return (
// 		<div style={{ margin: 'auto' }}>
// 			<Typography
// 				variant="h5"
// 				style={{ textAlign: 'center', margin: '10px', fontWeight: '600' }}
// 			>
// 				Drag and Resize Rectangle
// 			</Typography>

// 			<Stage
// 				width={720}
// 				height={420}
// 				style={{ border: '4px solid black', borderRadius: '10px' }}
// 				// onClick={canvasClick}
// 				ref={stageRef}
// 				onMouseDown={checkDeselect}
// 				onTouchStart={checkDeselect}
// 			>
// 				<Layer>
//
// 					{rectangles.map((rect, i) => {
// 						return (
// 							<Rectangle
// 								key={i}
// 								shapeProps={rect}
// 								isSelected={rect.id === selectedId}
// 								onSelect={() => {
// 									selectShape(rect.id);
// 								}}
// 								onChange={(newAttrs) => {
// 									const rects = rectangles.slice();
// 									rects[i] = newAttrs;
// 									setRectangles(rects);
// 								}}
// 							/>
// 						);
// 					})}
// 				</Layer>
// 			</Stage>
// 			<div>
// 				<input
// 					type="file"
// 					id="inputFileToLoad"
// 					onChange={imageUpload}
// 					multiple
// 					style={{ marginLeft: '10px' }}
// 				/>
// 				<Button
// 					variant="contained"
// 					color="primary"
// 					onClick={createRect}
// 					style={{ marginLeft: '170px', marginTop: '5px' }}
// 				>
// 					Generate a rectangle
// 				</Button>{' '}
// 				<Button
// 					variant="contained"
// 					color="secondary"
// 					onClick={clearStage}
// 					style={{ marginTop: '5px' }}
// 				>
// 					Clear
// 				</Button>
// 			</div>
// 		</div>
// 	);
// };

// export default withRouter(Canvas);
