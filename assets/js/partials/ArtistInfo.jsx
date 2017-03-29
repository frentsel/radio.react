import React from 'react';
import {Router, Route, hashHistory, Link} from 'react-router';


String.prototype.removeLinks = function() {
	return this.replace(/<a[^\>]+>[^\<]+<\/a>/ig, '');
};

const setDefaultImage = (e) => {
	e.target.src = "/img/placeholder-image.png";
	console.info("error: ", e.target);
};

const ArtistInfo = ({ artist }) => {

	console.info("artist: ", artist);

	return (
		<div className="artist-info">
			<Link to={'/artist-info/'+artist.name} title={artist.name}>
				<img src={artist.image[2]['#text']} onError={setDefaultImage} />
			</Link>
			<div className="artist-info__description">
				<h1>{artist.name}</h1>
				<p>{artist.bio.summary.removeLinks()}<br/>
					<Link to={'/artist-info/'+artist.name}>подробнее</Link>
				</p>
			</div>
		</div>
	);
};

export default ArtistInfo;