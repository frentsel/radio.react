import React from 'react';
import {Router, Route, hashHistory, Link} from 'react-router';
import meta from '../libs/meta';

String.prototype.stripTags = function () {
	return this.replace(/<\/?[^>]+(>|$)/g, '')
		.replace(/[\n]+/g, "<br />")
		.replace(/(Read more on Last\.fm.*)/g, "");
};

const setDefaultImage = (e) => {
	e.target.src = "/img/placeholder-image.png";
};

const Artist = React.createClass({

	getInitialState() {
		return {
			artist: {}
		}
	},

	componentWillMount() {

		const _this = this;

		meta.getArtistInfo(this.props.params.artistName, function (data) {
			_this.setState({
				artist: data.artist
			});
		});
	},

	render(){

		if (!this.state.artist.name)
			return <div className="loader"></div>;

		const artist = this.state.artist;
		const content = (
			<section>
				<h1>{artist.name}</h1>
				<div className="artist-info">
					<a href="#" title={artist.name}>
						<img src={artist.image[3]['#text']} onError={setDefaultImage} className="artist-info__image--medium" />
					</a>
					<div className="artist-info__description">
						<p dangerouslySetInnerHTML={{
							__html: artist.bio.content.stripTags()
						}}/>
					</div>
				</div>
			</section>);

		return this.state.artist.name ? content : '12312';
	}
});

export default Artist;