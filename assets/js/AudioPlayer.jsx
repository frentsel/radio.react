import React from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';
import Meta from './libs/meta';

const hideLoader = () => {
	$('body').toggleClass('streamLoading', false);
};

let timer;

const AudioPlayer = ({ src, meta, setMeta }) => {

	console.info("meta: ", meta);

	$('body').toggleClass('streamLoading', true);

	clearInterval(timer);
	timer = setInterval(() => {

		Meta.getTrackInfoByURL(src)
			.then(console.info);

	}, 2000);

	return (
		<div id="playerWrapper">
			<div className="meter">
				<span></span>
			</div>
			<audio id="audio" src={src} controls autoPlay onCanPlayThrough={hideLoader}></audio>
		</div>
	);
};

export default connect(
	state => ({
		src: state.player,
		meta: state.meta
	}),
	dispatch => ({
		setMeta: (meta) => {
			dispatch({
				type: 'SET_META',
				meta: meta
			});
		}
	})
)(AudioPlayer);