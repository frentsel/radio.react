import React from 'react';
import {connect} from 'react-redux';
import {Router, Route, hashHistory, Link} from 'react-router';
import stations from '../../data/stations.json';

// const  = ({ params, setTrack }) => {
const Station = React.createClass({

	getInitialState() {
		return {
			station: stations[this.props.params.stationId]
		}
	},

	componentWillMount() {
		this.props.setTrack(this.state.station.radio);
	},

	render(){

		const station = this.state.station;

		return (
			<div>
				<b>{station.title}</b>
				<img src={'/images/' + station.img} alt=""/>
				<p>{station.text}</p>
				<p>Жанр: <Link to={'/radio-genre/' + station.genre}>{station.genre}</Link>,
					Страна: <Link to={'/radio-country/' + station.country}>{station.country}</Link>,
					Город: <Link to={'/radio-city/' + station.city}>{station.city}</Link>
				</p>
			</div>
		);
	}
});

export default connect(
	state => ({
		url: state.player
	}),
	dispatch => ({
		setTrack: (url) => {
			dispatch({
				type: 'SET',
				url: url
			});
		}
	})
)(Station);