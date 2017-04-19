import React from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';
import Meta from './libs/meta';

const hideLoader = () => {
	$('body').toggleClass('streamLoading', false);
};

const SoundCloudPlayer = ({ src }) => {

	let widget,
		iframe;

	const widgetOptions = {
		color: "ff5500",
		auto_play: "true",
		hide_related: "false",
		show_comments: "true",
		show_user: "true",
		show_reposts: "false"
	};

	setTimeout(() => {

		iframe = document.getElementById('widgetSound');
		widget = SC.Widget(iframe);

		widget.load(src, widgetOptions);
		widget.unbind("pause");
		widget.unbind("stop");
		widget.unbind("play");

		widget.bind("pause", function (eventData) {
			console.info("pause: ", eventData);
		});

		widget.bind("stop", function (eventData) {
			console.info("stop: ", eventData);
		});

		widget.bind("play", function (eventData) {
			console.info("play: ", eventData);
		});

	}, 100);

	return (
		<div id="soundCloudPlayerWrapper">
			<iframe width="100%" height="120" scrolling="no" id="widgetSound" src={'https://w.soundcloud.com/player/?url=' + src}></iframe>
		</div>
	);
};

const Hml5AudioPlayer = ({src}) => {

	if (src.length) $('body').toggleClass('streamLoading', true);


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

const AudioPlayer = React.createClass({

	componentDidMount(){

		// 2. This code loads the IFrame Player API code asynchronously.
		var tag = document.createElement('script');

		tag.src = "https://www.youtube.com/iframe_api";
		var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

		// 3. This function creates an <iframe> (and YouTube player)
		//    after the API code downloads.
		var player;

		function onYouTubeIframeAPIReady() {
			player = new YT.Player('player', {
				height: '360',
				width: '640',
				videoId: 'M7lc1UVf-VE',
				events: {
					'onReady': onPlayerReady,
					'onStateChange': onPlayerStateChange
				}
			});
		}

		// 4. The API will call this function when the video player is ready.
		function onPlayerReady(event) {
			event.target.playVideo();
		}

		// 5. The API calls this function when the player's state changes.
		//    The function indicates that when playing a video (state=1),
		//    the player should play for six seconds and then stop.
		var done = false;

		function onPlayerStateChange(event) {
			if (event.data == YT.PlayerState.PLAYING && !done) {
				setTimeout(stopVideo, 6000);
				done = true;
			}
		}

		function stopVideo() {
			player.stopVideo();
		}
	},

	render(){

		const src = this.props.src;

		console.info("src: ", src);

		if (!src.length)
			return <Hml5AudioPlayer src={src}/>;

		if (src.indexOf('www.youtube.com/embed') !== -1)
			return <iframe id="youtubePlayer" width="250" height="141"
						   src={src + '?enablejsapi=1&autoplay=1'}></iframe>;

		return src.indexOf('api.soundcloud.com') === -1 ? <Hml5AudioPlayer src={src}/> : <SoundCloudPlayer src={src}/>;
	}
});

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