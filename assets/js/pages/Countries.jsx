import React from 'react';
import {Router, Route, hashHistory, Link} from 'react-router';
import stations from '../../../data/stations.json';

const Countries = () => {

	const keys = [];
	const data = stations.map((station, n) => {
		if(keys.indexOf(station.country) === -1){
			keys.push(station.country);
			return <li key={n}><Link to={'/radio-country/'+station.country}>{station.country}</Link></li>
		}
	});

	return (
		<div>
			<h1>Countries</h1>
			<ul className="list-items-horizontal">
				{data}
			</ul>
		</div>
	);
};

export default Countries;