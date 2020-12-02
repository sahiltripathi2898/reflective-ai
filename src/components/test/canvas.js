import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';

/* const initialPoints = [
	{
		x: 125,
		y: 130,
	},
	{
		x: 145,
		y: 130,
	},
	{
		x: 165,
		y: 160,
	},
	{
		x: 135,
		y: 160,
	},
]; */

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

export default withRouter(Canvas);
