import React from 'react';
import {connect} from 'react-redux';
import soundCloud from '../libs/SoundCloud';
import $ from 'jquery';

const duration = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
};

const TrackSoundCloud = ({item, setCurrentIndex, setTrack, player, play, pause}) => {

    const uri = item.uri + '/stream?client_id=' + soundCloud.clientId;

    const handler = (e) => {

        const $track = $(e.target).closest('.sound-track');
        const index = $track.index();

        $('.sound-track').not($track).removeClass('active play');

        $track.addClass('active');

        if ($track.hasClass('play')) {

            $track.removeClass('play', false);
            pause();
            return false;
        }

        setCurrentIndex(index);
        setTrack(uri);
        play();

        $track.addClass('play', true);
    };

    return (
        <div className="sound-track">
            <div className="sound-track__play-pause" onClick={handler}></div>
            <div className="sound-track__artist-name">{item.title}</div>
            <div className="sound-track__controls">
                <div className="sound-track__duration">{duration(item.duration)}</div>
            </div>
        </div>
    );
};

export default connect(
    state => ({
        url: state.source,
        player: state.player,
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
        },
        pause: (url) => {
            dispatch({
                type: 'PAUSE',
                url: url
            });
        }
    })
)(TrackSoundCloud);