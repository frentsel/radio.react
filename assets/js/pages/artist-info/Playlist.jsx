import React from 'react';
import meta from '../../libs/meta';
import soundCloud from '../../libs/SoundCloud';
import TrackSoundCloud from '../../partials/TrackSoundCloud.jsx';
import {connect} from 'react-redux';
import $ from 'jquery';

const Playlist = React.createClass({

		getInitialState() {
			return {
				playlist: []
			}
		},

		componentWillMount() {

			const _this = this,
				artist = this.props.params.artistName;

			// meta.getTopArtistTracks(artist, function (data) {
			//
			// 	_this.setState({
			// 		playlist: data.toptracks.track
			// 	});
			// });

			soundCloud.get.tracks({q: artist, offset: 0}, function (data) {
				_this.setState({ playlist: data.collection });
			});
		},

		render()
		{

			if (!this.state.playlist.length)
				return <div className="loader"></div>;

			// Next track feature
			if (this.props.player === 'end') {

				const index = $('.sound-track.active')
					.removeClass('active play')
					.next()
					.addClass('active play')
					.index();

				const uri = this.state.playlist[index].uri + '/stream?client_id=d8e1be45275edc853761bb5fb863a978';

				this.props.setTrack(uri);
				this.props.play();
			}


			return (
				<div className="artist-info">
					{this.state.playlist.map((item, n) => <TrackSoundCloud item={item} key={n} /> )}
				</div>
			);
		}
	})
	;

export default connect(
	state => ({
		player: state.player,
		source: state.source
	}),
	dispatch => ({
		setTrack: (url) => {
			dispatch({
				type: 'SET',
				url: url
			});
		},
		play: (url) => {
			dispatch({
				type: 'PLAY',
				url: url
			});
		}
	})
)(Playlist);