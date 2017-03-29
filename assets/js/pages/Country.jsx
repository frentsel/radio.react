import React from 'react';
import stations from '../../../data/stations.json';
import StationItem from '../partials/StationItem.jsx';

const Country = ({ params }) => {

	const data = stations.map((station, n) => {
		if(station.country === params.countryId)
			return <StationItem station={station} index={n} key={n} />
	});

	return (
		<div>
			<h1>Country</h1>
			<div className="station-list">
				{data}
			</div>
		</div>
	);
};

export default Country;