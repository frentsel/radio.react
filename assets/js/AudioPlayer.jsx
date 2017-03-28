import React from 'react';
import {connect} from 'react-redux';

const AudioPlayer = ({ src }) => {

	console.info("AudioPlayer: ", src);

	return (
		<audio id="audio" src={src} controls autoPlay></audio>
	);
};


export default connect(
	state => ({
		src: state.player
	})
)(AudioPlayer);