import React from 'react';
import {Router, Route, hashHistory, Link} from 'react-router';
import SoundCloud from '../../libs/SoundCloud';
import Track from '../../partials/Track.jsx';

String.prototype.stripTags = function () {
	const str = this.replace(/<\/?[^>]+(>|$)/g, '')
		.replace(/(Read more on Last\.fm.*)/g, "")
		.replace(/[\n]+/g, "</p><p>");
	return "<p>"+str+"</p>";
};

const setDefaultImage = (e) => {
	e.target.src = "/img/placeholder-image.png";
};

const Playlist = React.createClass({

	getInitialState() {
		return {
			playlist: []
		}
	},

	componentWillMount() {

		const _this = this;

		SoundCloud.get.tracks({q: this.props.params.artistName, offset: 0}, function(data){

			console.info("SoundCloud: ", data);

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
				{playlist.map((item, n) => <Track item={item} key={n} />)}
			</div>
		);
	}
});

export default Playlist;