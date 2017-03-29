import React from 'react';
import {Router, Route, hashHistory, Link} from 'react-router';

import stations from '../../../data/stations.json';

const Sidebar = () => {

	const genres = [];
	const types = {
		city: [],
		country: [],
		genre: {}
	};

	const data = stations.reduce((res, st) => {

		if(res.city.length < 10 && res.city.indexOf(st.city) === -1)
			res.city.push(st.city);

		if(res.country.length < 10 && res.country.indexOf(st.country) === -1)
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
			<b>Countries</b>
			<ul className="sidebar-list">
				{data.country.map((country, n) => <li key={n}><Link to={'/radio-country/'+country}>{country}</Link></li>)}
				<li key={100}><Link to={'/radio-countries/'}>все</Link></li>
			</ul>
			<b>Cities</b>
			<ul className="sidebar-list">
				{data.city.map((city, n) => <li key={n}><Link to={'/radio-city/'+city}>{city}</Link></li>)}
				<li key={100}><Link to={'/radio-cities/'}>все</Link></li>
			</ul>
		</div>
	);
};

export default Sidebar;