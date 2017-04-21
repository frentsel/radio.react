import React from 'react';
import {connect} from 'react-redux';

const YoutubeTrack = ({ item, setTrack }) => {

	const obj = item.snippet;
	const uri = 'https://www.youtube.com/embed/'+item.id.videoId;

	return (
		<div className="youtube-track" onClick={setTrack.bind(null, uri)}>
			<div className="youtube-track__img">
				<img src={obj.thumbnails.medium.url} alt={'dsf'} />
			</div>
			<div className="youtube-track__artist-name">{obj.title}</div>
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
		}
	})
)(YoutubeTrack);