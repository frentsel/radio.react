import React from 'react';
import {connect} from 'react-redux';
import {Router, Route, hashHistory, Link} from 'react-router';
import stations from '../../../data/stations.json';
import DisqusBlock from '../partials/DisqusBlock.jsx';
import ArtistInfo from '../partials/ArtistInfo.jsx';
import meta from '../meta';

const Station = React.createClass({

	getInitialState() {
		return {
			station: stations[this.props.params.stationId],
			artist: {}
		}
	},

	componentWillMount() {

		const _this = this;

		this.props.setTrack(this.state.station.radio);

		meta.getTrackInfo(this.props.params.stationId)
			.then(function (res) {
				_this.setState({
					station: _this.state.station,
					artist: res.artist
				});
			});
	},

	componentWillUnmount() {
		this.props.setTrack(this.state.station.radio);
	},

	render(){

		const station = this.state.station;
		const artist = this.state.artist;

		return (
			<div>
				<div className="station-page">
					<img src={'/images/' + station.img} alt=""/>
					<div className="station-info__description">
						<h1>{station.title}</h1>
						<p>{station.text}</p>
						<p>Жанр: <Link to={'/radio-genre/' + station.genre}>{station.genre}</Link>,
							Страна: <Link to={'/radio-country/' + station.country}>{station.country}</Link>,
							Город: <Link to={'/radio-city/' + station.city}>{station.city}</Link>
						</p>
					</div>
				</div>
				{ artist.name ? <ArtistInfo artist={artist} /> : '' }
				<DisqusBlock
					url={window.location.href}
					identifier={this.state.station.title}
					title={this.state.station.title}
				/>
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