import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import Container from '@material-ui/core/Container';
import { Paper, Typography } from '@material-ui/core';
import axios from 'axios';
import Spinner from '../../../spinner';

function MaskGraph(props) {
	const { cID, sDate, eDate } = props;
	const [loading, setLoading] = useState(true);
	const [options, setOptions] = useState({
		chart: {
			type: 'bar',
			height: 350,
		},
		plotOptions: {
			bar: {
				horizontal: false,
				columnWidth: '25%',
				endingShape: 'rounded',
			},
		},
		dataLabels: {
			enabled: false,
		},
		stroke: {
			show: true,
			width: 2,
			colors: ['transparent'],
		},
		xaxis: {
			categories: ['19 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '4 PM'],
		},
		yaxis: {
			title: {
				text: '',
			},
		},
		fill: {
			opacity: 1,
		},
		tooltip: {
			enabled: false,
			y: {
				formatter: function (val) {
					return val;
				},
			},
		},
	});
	const [series, setSeries] = useState([
		{
			name: 'Occupancy Maximum',
			data: [3, 6, 6, 6, 2, 4, 3],
		},
	]);

	useEffect(() => {
		/*         console.log(cID)
        console.log(sDate)
        console.log(eDate) */

		var day0 = new Date(sDate);
		day0 = day0.toString().substring(0, 15);

		var day1 = new Date(sDate);
		day1.setDate(day1.getDate() + 1);
		day1 = day1.toString().substring(0, 15);

		var day2 = new Date(sDate);
		day2.setDate(day2.getDate() + 2);
		day2 = day2.toString().substring(0, 15);

		var day3 = new Date(sDate);
		day3.setDate(day3.getDate() + 3);
		day3 = day3.toString().substring(0, 15);

		var day4 = new Date(sDate);
		day4.setDate(day4.getDate() + 4);
		day4 = day4.toString().substring(0, 15);

		var day5 = new Date(sDate);
		day5.setDate(day5.getDate() + 5);
		day5 = day5.toString().substring(0, 15);

		var day6 = new Date(sDate);
		day6.setDate(day6.getDate() + 6);
		day6 = day6.toString().substring(0, 15);

		//options..xaxis...categories

		setOptions({
			...options,
			xaxis: {
				categories: [day0, day1, day2, day3, day4, day5, day6],
			},
		});
	}, [cID, sDate, eDate]);

	useEffect(() => {
		const data = {
			project_id: Number(localStorage.getItem('projectID')),
			jwt_token: localStorage.getItem('jwt_token'),
			camera_id: cID,
			start_date: sDate.toISOString().slice(0, 10) + ' 00:00:00',
			company_id: Number(localStorage.getItem('company_id')),
		};
		//console.log(data)
		var str =
			'occmaxgraph' +
			'project' +
			Number(localStorage.getItem('projectID')) +
			'camera' +
			cID +
			'company' +
			Number(localStorage.getItem('company_id')) +
			sDate.toISOString().slice(0, 10) +
			' 00:00:00';
		if (localStorage.getItem(str) !== null) {
			const curr = JSON.parse(localStorage.getItem(str));
			setSeries([{ ...series, data: curr.values }]);
			setLoading(false);
		} else {
			axios
				.post('https://api.reflective.ai/timeseries/max', data)
				.then((res) => {
					//console.log(res.data)
					localStorage.setItem(str, JSON.stringify(res.data));
					setSeries([{ ...series, data: res.data.values }]);
					setLoading(false);
				})
				.catch((err) => console.log(err));
		}
	}, [cID, sDate, eDate]);

	if (loading) return <Spinner />;

	return (
		<div id="chart" style={{ marginTop: '20px', marginBottom: '20px' }}>
			<Typography
				variant="h6"
				style={{
					marginTop: '5px',
					fontWeight: '400',
					marginBottom: '20px',
					fontSize: '1rem',
				}}
			>
				Occupancy Maximum
			</Typography>
			<Paper
				elevation={6}
				style={{
					height: '440px',
					position: 'relative',
					width: '100%',
					borderRadius: '10px',
				}}
			>
				<Container
					fixed
					style={{ width: '100%', marginTop: '50px', position: 'absolute' }}
				>
					<ReactApexChart
						options={options}
						series={series}
						type="bar"
						height={350}
					/>
				</Container>
			</Paper>
		</div>
	);
}

export default MaskGraph;
