import React from 'react';
import {Router, Route, hashHistory, Link} from 'react-router';

const Artist = ({ params, children }) => {

	const artist = params.artistName;

	console.info("params: ", params);
	console.info("children: ", children.type.displayName);

	return (
		<section>
			<ul className="artist-info-controls">
				<li><Link activeClassName={'active'} to={'/artist-bio/'+artist}>Биография</Link></li>
				<li><Link activeClassName={'active'} to={'/artist-playlist/'+artist}>Плейтист</Link></li>
				<li><Link activeClassName={'active'} to={'/artist-photo/'+artist}>Фото</Link></li>
				<li><Link activeClassName={'active'} to={'/artist-video/'+artist}>Видео</Link></li>
				<li><Link activeClassName={'active'} to={'/artist-albums/'+artist}>Альбомы</Link></li>
			</ul>
			{children}
		</section>
	);
};

export default Artist;