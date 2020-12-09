import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';
import {
	Stage,
	Layer,
	Rect,
	Text,
	Circle,
	Line,
	Transformer,
	Image,
} from 'react-konva';

const Rectangle = ({ shapeProps, isSelected, onSelect, onChange }) => {
	const shapeRef = React.useRef();
	const trRef = React.useRef();

	React.useEffect(() => {
		if (isSelected) {
			// we need to attach transformer manually
			trRef.current.nodes([shapeRef.current]);
			trRef.current.getLayer().batchDraw();
		}
	}, [isSelected]);

	return (
		<React.Fragment>
			<Rect
				onClick={onSelect}
				onTap={onSelect}
				ref={shapeRef}
				{...shapeProps}
				draggable
				onDragEnd={(e) => {
					onChange({
						...shapeProps,
						x: e.target.x(),
						y: e.target.y(),
					});
				}}
				onTransformEnd={(e) => {
					// transformer is changing scale of the node
					// and NOT its width or height
					// but in the store we have only width and height
					// to match the data better we will reset scale on transform end
					const node = shapeRef.current;
					const scaleX = node.scaleX();
					const scaleY = node.scaleY();

					// we will reset it back
					node.scaleX(1);
					node.scaleY(1);
					onChange({
						...shapeProps,
						x: node.x(),
						y: node.y(),
						// set minimal value
						width: Math.max(5, node.width() * scaleX),
						height: Math.max(node.height() * scaleY),
					});
				}}
			/>
			{isSelected && (
				<Transformer
					ref={trRef}
					boundBoxFunc={(oldBox, newBox) => {
						// limit resize
						if (newBox.width < 5 || newBox.height < 5) {
							return oldBox;
						}
						return newBox;
					}}
				/>
			)}
		</React.Fragment>
	);
};

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
	const { history } = props;

	const [rectangles, setRectangles] = React.useState([
		/* 		{
			x: 10,
			y: 10,
			width: 100,
			height: 100,
			id: 'rect1',
			stroke: 'red',
		},
		{
			x: 70,
			y: 100,
			width: 100,
			height: 100,
			id: 'rect1',
			stroke: 'red',
        }, */
	]);
	const [selectedId, selectShape] = React.useState(null);

	useEffect(() => {
		console.log(rectangles);
	}, [rectangles]);

	const checkDeselect = (e) => {
		// deselect when clicked on empty area
		const clickedOnEmpty = e.target === e.target.getStage();
		if (clickedOnEmpty) {
			selectShape(null);
		}
	};

	const stageRef = React.useRef(null);
	const layerRef = React.useRef(null);
	const [rectCount, setrectCount] = useState(0);
	const [rectdelcount, setrectdelcount] = useState(0);

	function createRect() {
		let old = [...rectangles];
		old[rectCount] = {
			x: 10,
			y: 10,
			width: 100,
			height: 100,
			id: 'rect1',
			stroke: 'red',
		};
		setRectangles(old);
		setrectCount((old) => old + 1);
	}

	const [imgSrc, setimgSrc] = useState('');

	function imageUpload(e) {
		var file = document.getElementById('inputFileToLoad').files;
		setimgSrc(URL.createObjectURL(file[0]));
	}

	function clearStage() {
		let old = [...rectangles];

		old[rectdelcount] = {};
		setRectangles(old);
		setrectdelcount((old) => old + 1);
	}

	return (
		<div style={{ margin: 'auto' }}>
			<Typography
				variant="h5"
				style={{ textAlign: 'center', margin: '10px', fontWeight: '600' }}
			>
				Drag and Resize Rectangle
			</Typography>

			<Stage
				width={720}
				height={420}
				style={{ border: '4px solid black', borderRadius: '10px' }}
				/* onClick={canvasClick} */
				ref={stageRef}
				onMouseDown={checkDeselect}
				onTouchStart={checkDeselect}
			>
				<Layer>
					<URLImage src={imgSrc} />
					{rectangles.map((rect, i) => {
						return (
							<Rectangle
								key={i}
								shapeProps={rect}
								isSelected={rect.id === selectedId}
								onSelect={() => {
									selectShape(rect.id);
								}}
								onChange={(newAttrs) => {
									const rects = rectangles.slice();
									rects[i] = newAttrs;
									setRectangles(rects);
								}}
							/>
						);
					})}
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
					onClick={createRect}
					style={{ marginLeft: '355px', marginTop: '5px' }}
				>
					Generate a rectangle
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

/* import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';

const Canvas = (props) => {
	const { history } = props;

	const [points, setPoints] = useState([]);

	function canvasClick(e) {
		const canvas = document.getElementById('mycanvas');
		const c = canvas.getContext('2d');
		var rect = canvas.getBoundingClientRect();
		// Make a dot
		c.strokeStyle = 'orange';
		c.beginPath();
		//c.rect(e.clientX - rect.left, e.clientY - rect.top, 4, 4);
		c.arc(e.clientX - rect.left, e.clientY - rect.top, 3, 0, 2 * Math.PI);
		c.fill();

		const point = {
			x: e.clientX - rect.left,
			y: e.clientY - rect.top,
		};
		setPoints([...points, point]);
	}

	function createPolygon() {
		const canvas = document.getElementById('mycanvas');
		const c = canvas.getContext('2d');

		c.lineWidth = 3;
		c.strokeStyle = 'red';
		for (var i = 0; i < points.length - 1; i++) {
			c.moveTo(points[i].x, points[i].y);
			c.lineTo(points[i + 1].x, points[i + 1].y);
			c.stroke();
		}
		//Last Line
		c.moveTo(points[i].x, points[i].y);
		c.lineTo(points[0].x, points[0].y);
		c.stroke();
	}

	function clearCanvas() {
		const canvas = document.getElementById('mycanvas');
		const c = canvas.getContext('2d');
		c.clearRect(0, 0, canvas.width, canvas.height);
	}

	function imageUpload(e) {
		setPoints([]);
		const canvas = document.getElementById('mycanvas');
		const c = canvas.getContext('2d');
		var file = document.getElementById('inputFileToLoad').files;
		var img = new Image();
		img.src = URL.createObjectURL(file[0]);
		img.onload = () => {
			c.drawImage(img, 0, 0, 720, 420);
		};
	}

	return (
		<div>
			<div>
				<Typography
					variant="h5"
					style={{ textAlign: 'center', margin: '10px', fontWeight: '600' }}
				>
					Select points to make a polygon
				</Typography>
				<canvas
					id="mycanvas"
					width="720px"
					height="420px"
					style={{ border: '1px solid black' }}
					onClick={canvasClick}
				></canvas>
			</div>
			<div>
				<input
					type="file"
					id="inputFileToLoad"
					onChange={imageUpload}
					multiple
				/>
				<Button variant="contained" color="primary" onClick={createPolygon}>
					Create Polygon
				</Button>{' '}
				<Button variant="contained" color="primary" onClick={clearCanvas}>
					Clear
				</Button>
			</div>
		</div>
	);
};

export default withRouter(Canvas); */
