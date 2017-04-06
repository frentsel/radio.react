import React from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';
import Meta from './libs/meta';

const hideLoader = () => {
	$('body').toggleClass('streamLoading', false);
};

let timer;

const SoundCloudPlayer = ({ src }) => {
	return (
		<div id="soundCloudPlayerWrapper">
			<iframe width="100%" height="120" scrolling="no" src={'https://w.soundcloud.com/player/?url='+src+'&color=ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false'}></iframe>
		</div>
	);
};
const Hml5AudioPlayer = ({ src }) => {

	if(src.length) $('body').toggleClass('streamLoading', true);


	// clearInterval(timer);
	// timer = setInterval(() => {
	//
	// 	Meta.getTrackInfoByURL(src)
	// 		// .then(setMeta);
	// 		.then(console.info);
	//
	// }, 5000);

	return (
		<div id="playerWrapper">
			<div className="meter">
				<span></span>
			</div>
			<audio id="audio" src={src} controls autoPlay onCanPlayThrough={hideLoader}></audio>
		</div>
	);
};

const AudioPlayer = ({ src, meta, setMeta }) => {

	console.info("src: ", src);

	if(!src.length) return <Hml5AudioPlayer src={src} />;

	return src.indexOf('api.soundcloud.com') === -1 ? <Hml5AudioPlayer src={src} /> : <SoundCloudPlayer src={src} />;
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