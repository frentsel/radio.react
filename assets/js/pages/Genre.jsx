import React from 'react';
import stations from '../../../data/stations.json';
import StationItem from '../partials/StationItem.jsx';

const Genre = ({ params }) => {

	const data = stations.map((station, n) => {
		if(station.genre === params.genreId)
			return <StationItem station={station} index={n} key={n} />
	});

	return (
		<div>
			<h1>Genre</h1>
			<div className="station-list">
				{data}
			</div>
		</div>
	);
};

export default Genre;