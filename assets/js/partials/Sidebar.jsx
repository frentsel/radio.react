import React from 'react';
import {Router, Route, hashHistory, Link} from 'react-router';

import stations from '../../data/stations.json';

const Sidebar = () => {

	const genres = [];
	const types = {
		city: [],
		country: [],
		genre: {}
	};

	const data = stations.reduce((res, st) => {

		if(res.city.indexOf(st.city) === -1)
			res.city.push(st.city);

		if(res.country.indexOf(st.country) === -1)
			res.country.push(st.country);

		if(res.genre[st.genre] === undefined) {
			res.genre[st.genre] = st.genre;
			genres.push({
				en: st.genre,
				ru: st.genreRu,
			});
		}

		return res;

	}, types);

	return (
		<div id="sidebar">
			<b>Genres</b>
			<ul className="sidebar-list">
				{genres.map((genre, n) => <li key={n}><Link to={'/radio-genre/'+genre.en}>{genre.ru}</Link></li>)}
			</ul>
			<b><Link to={'/radio-countries'}>Countries</Link></b>
			<ul className="sidebar-list">
				{data.country.map((country, n) => <li key={n}><Link to={'/radio-country/'+country}>{country}</Link></li>)}
			</ul>
			<b><Link to={'/radio-cities'}>Cities</Link></b>
			<ul className="sidebar-list">
				{data.city.map((city, n) => <li key={n}><Link to={'/radio-city/'+city}>{city}</Link></li>)}
			</ul>
		</div>
	);
};

export default Sidebar;