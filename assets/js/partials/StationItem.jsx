import React from 'react';
import {Router, Route, hashHistory, Link} from 'react-router';

const StationItem = ({ station, index }) => {

	return (
		<div>
			<b>{station.title}</b>
			<Link  to={'/radio-station/'+index}>
				<img src={'/images/'+station.img} alt="" />
			</Link>
		</div>
	);
};

export default StationItem;