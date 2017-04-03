import React from 'react';
import {Router, Route, hashHistory, Link} from 'react-router';


String.prototype.removeLinks = function() {
	return this.replace(/<a[^\>]+>[^\<]+<\/a>/ig, '');
};

const setDefaultImage = (e) => {
	e.target.src = "/img/placeholder-image.png";
};

const ArtistInfo = ({ artist }) => {

	console.info("ArtistInfo: ", artist);

	return (
		<section className="artist-info">
			<Link to={'/artist-info/'+encodeURIComponent(artist.name)} title={artist.name}>
				<img src={artist.image[2]['#text']} onError={setDefaultImage} className="artist-info__image--small" />
			</Link>
			<div className="artist-info__description">
				<h2>{artist.name}</h2>
				<p>{artist.bio.summary.removeLinks()}<br/>
					<Link to={'/artist-info/'+encodeURIComponent(artist.name)}>подробнее</Link>
				</p>
			</div>
		</section>
	);
};

export default ArtistInfo;