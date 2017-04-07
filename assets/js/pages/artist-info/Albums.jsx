import React from 'react';
import {Router, Route, hashHistory, Link} from 'react-router';
import meta from '../../libs/meta';

const setDefaultImage = (e) => {
	e.target.src = "/img/placeholder-image.png";
};

const AlbumItem = ({ album }) => {
	return (
		<Link className="album-item" to={'/artist-album/'+album.artist.name+'/'+album.name}>
			<img src={album.image[2]["#text"]} onError={setDefaultImage} />
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

		const _this = this;

		meta.getTopAlbums(this.props.params.artistName, function (data) {

			console.info("albums: ", data.topalbums.album);
			_this.setState({
				albums: data.topalbums.album
			});
		});
	},

	render(){

		if (!this.state.albums.length)
			return <div className="loader"></div>;

		const albums = this.state.albums;

		return (
			<div className="albums-block">
				{albums.map((album, n) => <AlbumItem album={album} key={n} />)}
			</div>
		);
	}
});

export default Albums;