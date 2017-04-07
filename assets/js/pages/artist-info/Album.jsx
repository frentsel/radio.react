import React from 'react';
import {Router, Route, hashHistory, Link} from 'react-router';
import Track from '../../partials/Track.jsx';
import meta from '../../libs/meta';

const setDefaultImage = (e) => {
	e.target.src = "/img/placeholder-image.png";
};

String.prototype.stripTags = function () {
	const str = this.replace(/<\/?[^>]+(>|$)/g, '')
		.replace(/(Read more on Last\.fm.*)/g, "")
		.replace(/[\n]+/g, "</p><p>");
	return "<p>"+str+"</p>";
};

const Album = React.createClass({

	getInitialState() {
		return {
			album: {}
		}
	},

	componentWillMount() {

		const artist = this.props.params.artistName;
		const album = this.props.params.album;

		meta.getAlbum(artist, album, (data) => {
			this.setState({
				album: data.album
			});
		});
	},

	render(){

		if (this.state.album.name === undefined)
			return <div className="loader"></div>;

		const artist = this.props.params.artistName;
		const album = this.state.album;

		console.info("album: ", album);

		return (
			<div className="albums-section">
				<Link className="albums-section__image-link" to={'/artist-bio/'+encodeURIComponent(album.name)} title={album.name}>
					<img src={album.image["2"]['#text']} onError={setDefaultImage} className="artist-info__image--small" />
				</Link>
				<div className="album-block__description">
					<h1>{artist}: {album.name}</h1>
					{album.wiki !== undefined ? <div dangerouslySetInnerHTML={{
						__html: album.wiki.content.stripTags()
					}} /> : ''}
				</div>
				<div className="album-block__playlist">
					{album.tracks.track.map((track, n) => <Track item={track} key={n} />)}
				</div>
			</div>
		);
	}
});

export default Album;