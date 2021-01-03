import React from 'react';
import Card from './card';
import HorizGraph from './charthoriz';
import VertGraph from './chartvert';

function WorkerTest() {
	return (
		<div style={{ marginTop: '100px' }}>
			<Card />
			<HorizGraph />
			<VertGraph />
		</div>
	);
}

export default WorkerTest;
