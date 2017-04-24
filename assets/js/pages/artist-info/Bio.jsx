import React from 'react';
import {Router, Route, hashHistory, Link} from 'react-router';
import meta from '../../libs/meta';

String.prototype.stripTags = function () {
	const str = this.replace(/<\/?[^>]+(>|$)/g, '')
		.replace(/(Read more on Last\.fm.*)/g, "")
		.replace(/[\n]+/g, "</p><p>");
	return "<p>"+str+"</p>";
};

const setDefaultImage = (e) => {
	e.target.src = "/img/placeholder-image.png";
};

const Bio = React.createClass({

	getInitialState() {

		hashHistory.listen(this.hashHandler);

		return {
			artist: {},
			artistName: ''
		}
	},

	hashHandler() {

		const artistName = this.props.params.artistName;

		if(this.state.artistName === artistName) {
			return false;
		}

		this.setState({
			artist: {},
			artistName: artistName
		});

		meta.getArtistInfo(artistName, (data) => {
			this.setState({
				artist: data.artist,
				artistName: artistName
			});
		});
	},

	componentWillMount() {

		const artistName = this.props.params.artistName;

		meta.getArtistInfo(artistName, (data) => {
			this.setState({
				artist: data.artist,
				artistName: artistName
			});
		});
	},

	render(){

		if (!this.state.artist.name)
			return <div className="loader"></div>;

		const artist = this.state.artist;

		return (
			<div className="artist-info">
				<Link to={'/'} title={artist.name}>
					<img src={artist.image[3]['#text']} onError={setDefaultImage} className="artist-info__image--medium" />
				</Link>
				<div className="artist-info__description">
					<h1>{artist.name}</h1>
					<div dangerouslySetInnerHTML={{
						__html: artist.bio.content.stripTags()
					}}/>
				</div>
			</div>
		);
	}
});

export default Bio;