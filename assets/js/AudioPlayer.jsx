import React from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';

const hideLoader = () => {
	$('body').toggleClass('streamLoading', false);
};

const AudioPlayer = ({ src }) => {

	$('body').toggleClass('streamLoading', true);

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
		src: state.player
	})
)(AudioPlayer);