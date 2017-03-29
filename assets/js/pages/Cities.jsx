import React from 'react';
import {Router, Route, hashHistory, Link} from 'react-router';
import stations from '../../../data/stations.json';

const Cities = () => {

	const keys = [];
	const data = stations.map((station, n) => {
		if(keys.indexOf(station.city) === -1){
			keys.push(station.city);
			return <li key={n}><Link to={'/radio-city/'+station.city}>{station.city}</Link></li>
		}
	});

	return (
		<div>
			<h1>Cities</h1>
			<ul className="list-items-horizontal">
				{data}
			</ul>
		</div>
	);
};

export default Cities;