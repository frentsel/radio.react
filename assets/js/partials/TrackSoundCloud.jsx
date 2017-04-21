import React from 'react';
import {connect} from 'react-redux';
import soundCloud from '../libs/SoundCloud';
import $ from 'jquery';

const duration = (millis) => {
	var minutes = Math.floor(millis / 60000);
	var seconds = ((millis % 60000) / 1000).toFixed(0);
	return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
};

const TrackSoundCloud = ({ item, setTrack, play }) => {

	const uri = item.uri + '/stream?client_id='+soundCloud.clientId;

	const handler = (e) => {
		$('.sound-track').removeClass('active play');
		$(e.target).closest('.sound-track').addClass('active play');
		setTrack(uri);
		play();
	};

	return (
/*		<div className="sound-track">
			<div className="sound-track__play-pause" onClick={handler}></div>
			<div className="sound-track__artist-name">{item.artist.name} - {item.name}</div>
			<div className="sound-track__controls">
				<div className="sound-track__duration">123</div>
			</div>
		</div>*/
		<div className="sound-track">
			<div className="sound-track__play-pause" onClick={handler}></div>
			<div className="sound-track__artist-name">{item.title}</div>
			<div className="sound-track__controls">
				<div className="sound-track__duration">{duration(item.duration)}</div>
			</div>
		</div>
	);
};

export default connect(
	state => ({
		url: state.source
	}),
	dispatch => ({
		setTrack: (url) => {
			dispatch({
				type: 'SET',
				url: url
			});
		},
		play: (url) => {
			dispatch({
				type: 'PLAY',
				url: url
			});
		}
	})
)(TrackSoundCloud);