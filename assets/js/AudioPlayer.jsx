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
			<div className="spinner">
				<div className="bounce1"></div>
				<div className="bounce2"></div>
				<div className="bounce3"></div>
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