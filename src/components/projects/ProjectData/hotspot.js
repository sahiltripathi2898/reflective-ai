import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Paper, Typography } from '@material-ui/core';
import Spinner from '../../spinner';

function Hotspot(props) {
	const { cID, sDate, eDate } = props;

	const [loading, setLoading] = useState(true);

	const [baseImg, setbaseImg] = useState('');
	const [hotImg, sethotImg] = useState('');
	const [imgSrc, setimgSrc] = useState('');

	var startDate = sDate.toISOString().slice(0, 10) + ' 00:00:00';
	var endDate = eDate.toISOString().slice(0, 10) + ' 23:00:00';

	useEffect(() => {
		const data = {
			project_id: Number(localStorage.getItem('projectID')),
			jwt_token: localStorage.getItem('jwt_token'),
			camera_id: cID,
			start_date: startDate,
			end_date: endDate,
			company_id: Number(localStorage.getItem('company_id')),
		};
		//console.log(data);
		axios
			.post('https://api.reflective.ai/hotspot/image', data)
			.then((res) => {
				//console.log(res.data);
				setbaseImg(res.data.base_image);
				sethotImg(res.data.hot_image);
				setimgSrc(res.data.base_image);
				setLoading(false);
			})
			.catch((err) => console.log(err));
	}, [cID, sDate, eDate]);

	if (loading) return <Spinner />;
	return (
		<div>
			<Typography
				variant="h4"
				style={{
					marginBottom: '5px',
					marginTop: '30px',
					fontFamily: 'Roboto , sans-serif',
					fontWeight: '600',
				}}
			>
				Hotspot Analysis
			</Typography>
			<div
				style={{
					height: '9px',
					width: '320px',
					backgroundColor: '#179CD5',
					borderRadius: '10px',
					marginBottom: '25px',
				}}
			></div>
			<Paper
				style={{ height: '52vw', marginBottom: '50px', padding: '20px' }}
				elevation={10}
			>
				<img
					src={'https://api.reflective.ai/image' + imgSrc}
					width="100%"
					height="100%"
					onMouseEnter={() => {
						setimgSrc(hotImg);
					}}
					onMouseLeave={() => setimgSrc(baseImg)}
				></img>
			</Paper>
		</div>
	);
}

export default Hotspot;
