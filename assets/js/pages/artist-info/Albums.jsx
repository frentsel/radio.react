import React from 'react';
import {Router, Route, hashHistory, Link} from 'react-router';
import meta from '../../libs/meta';

const AlbumItem = ({ album, artist }) => {

	const setDefaultImage = (e) =>
		e.target.src = "/img/placeholder-image.png";

	return (
		<Link className="album-item" to={'/artist-album/'+artist+'/'+album.name}>
			<img src={album.img} onError={setDefaultImage} />
			<span className="album-item__name">{album.name}</span>
		</Link>
	);
};

const Albums = React.createClass({

	getInitialState() {
		return {
			albums: []
		}
	},

	componentWillMount() {

		meta.getTopAlbums(this.props.params.artistName, (data) => {
			this.setState({
				albums: data
			});
		});
	},

	render(){

		if (!this.state.albums.length)
			return <div className="loader"></div>;

		const albums = this.state.albums;
		const artist = this.props.params.artistName;

		console.info("albums: ", albums);

		return (
			<div className="albums-block">
				{albums.map((album, n) => <AlbumItem album={album} artist={artist} key={n} />)}
			</div>
		);
	}
});

export default Albums;