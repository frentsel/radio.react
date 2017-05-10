import React from 'react';
import soundCloud from '../../libs/SoundCloud';
import meta from '../../libs/meta';
import TrackSoundCloud from '../../partials/TrackSoundCloud.jsx';
import {connect} from 'react-redux';
import $ from 'jquery';

const scrollToActiveItem = function (n) {

    let $track = $('.sound-track.active'),
        $tracks = $('.sound-track');

    if(!$track.length) {
        $track = $tracks.eq(n);
    }

    const index = $track.index() || 0,
        playlist = $('#soundCloudPlaylist').parent(),
        offset = index * ($track.outerHeight(true) + 1) - (playlist.outerHeight(true) / 2 - 75);

    playlist.animate({
        scrollTop: (offset)
    }, 200);
};

const setActiveItem = function (n) {

    let $tracks = $('.sound-track'),
        $audio = $('#audio'),
        $activeTrack = $tracks.eq(n);

    $tracks.removeClass('active');
    $activeTrack.addClass('active');

    if(!$audio[0].paused)
        $activeTrack.addClass('play');
};

let _playlist = {
    current: 0,
    data: [],
    getAll: function () {
        return this.data;
    },
    getCurrent: function () {
        return this.data[this.current];
    },
    setCurrent: function (index) {
        return this.current = index;
    },
    play: function () {

        $('.sound-track.active')
            .addClass('play');
    },
    pause: function () {

        $('.sound-track.active')
            .removeClass('play');
    },
    getNext: function () {

        const $item = $('.sound-track.active');
        let index;

        if ($item.length) {

            index = $item.removeClass('active play')
                .next()
                .addClass('active play')
                .index();

            this.current = index;
            return this.data[index] || false;
        }

        return this.data[++this.current] || false;
    },
    getPrev: function () {
        return this.data[--this.current] || false;
    }
};

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
                _this.setState({playlist: data.collection});
                _playlist.data = data.collection;
            });
        },

        componentDidUpdate() {

            this.state.playlist.map((item, n) => {

                if(this.props.source.includes(item.uri)) {

                    _playlist.setCurrent(n);
                    scrollToActiveItem(n);
                    setActiveItem(n);
                }
            });
        },

        render()
        {

            if (!this.state.playlist.length)
                return <div className="loader"></div>;

            // Play
            if (this.props.player === 'play') {
                _playlist.play();
            }

            // Pause
            if (this.props.player === 'pause') {
                _playlist.pause();
            }

            // Next track by 'end' event
            if (this.props.player === 'end') {

                const uri = _playlist.getNext().uri + '/stream?client_id=' + soundCloud.clientId;

                this.props.setTrack(uri);
                this.props.play();
                scrollToActiveItem();
            }

            return (
                <div className="artist-info" id="soundCloudPlaylist">
                    {this.state.playlist.map((item, n) =>
                        <TrackSoundCloud currentIndex={_playlist.getCurrent()} source={this.props.source} item={item} key={n} setCurrentIndex={_playlist.setCurrent.bind(_playlist)}/>
                    )}
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