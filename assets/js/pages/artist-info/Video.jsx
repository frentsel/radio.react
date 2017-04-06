import React from 'react';
import {Router, Route, hashHistory, Link} from 'react-router';
import youtube from '../../libs/youtube';
import YoutubeTrack from '../../partials/YoutubeTrack.jsx';

const Video = React.createClass({

	getInitialState() {
		return {
			playlist: []
		}
	},

	componentWillMount() {

		const _this = this;

		youtube.getByName(this.props.params.artistName, function (data) {

			console.info("youtube: ", data);
			_this.setState({
				playlist: data.items
			});
		});
	},

	render(){

		if (!this.state.playlist.length)
			return <div className="loader"></div>;

		const playlist = this.state.playlist;

		return (
			<div className="youtube-tracks">
				{playlist.map((item, n) => <YoutubeTrack item={item} key={n} />)}
			</div>
		);
	}
});

export default Video;