import React from 'react';
import stations from '../../data/stations.json';
import StationItem from '../partials/StationItem.jsx';

const City = ({ params }) => {

	const data = stations.map((station, n) => {
		if(station.city === params.cityId)
			return <StationItem station={station} index={n} key={n} />
	});

	return (
		<div>
			<h1>City</h1>
			<div className="station-list">
				{data}
			</div>
		</div>
	);
};

export default City;