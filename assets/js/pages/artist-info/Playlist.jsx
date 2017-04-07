import React from 'react';
// import {Router, Route, hashHistory, Link} from 'react-router';
import meta from '../../libs/meta';
import soundCloud from '../../libs/SoundCloud';
import TrackSoundCloud from '../../partials/TrackSoundCloud.jsx';

const Playlist = React.createClass({

	getInitialState() {
		return {
			playlist: []
		}
	},

	componentWillMount() {

		const _this = this;
		const artist = this.props.params.artistName;

		meta.getTopArtistTracks(artist, function(data){

			console.info("getTopArtistTracks: ", data.toptracks.track);

			// _this.setState({
			// 	playlist: data.toptracks.track
			// });
		});

		soundCloud.get.tracks({q: artist, offset: 0}, function(data){

			_this.setState({
				playlist: data.collection
			});
		});
	},

	render(){

		if (!this.state.playlist.length)
			return <div className="loader"></div>;

		const playlist = this.state.playlist;

		return (
			<div className="artist-info">
				{playlist.map((item, n) => <TrackSoundCloud item={item} key={n} />)}
			</div>
		);
	}
});

export default Playlist;