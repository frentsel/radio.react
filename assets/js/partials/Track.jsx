import React from 'react';
import {connect} from 'react-redux';

const duration = (millis) => {
	var minutes = Math.floor(millis / 60000);
	var seconds = ((millis % 60000) / 1000).toFixed(0);
	return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
};

const Track = ({ item, setTrack }) => {

	const uri = item.uri+'/stream?client_id=d8e1be45275edc853761bb5fb863a978';
	return (
		<div className="sound-track">
			<div className="sound-track__play-pause" onClick={setTrack.bind(null, uri)}>►</div>
			<div className="sound-track__artist-name">{item.title}</div>
			<div className="sound-track__controls">
				<div className="sound-track__duration">{duration(item.duration)}</div>
			</div>
		</div>
	);
};

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
)(Track);