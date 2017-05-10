import React from 'react';
import {connect} from 'react-redux';
import soundCloud from '../libs/SoundCloud';
import $ from 'jquery';

const duration = (millis) => {

    var minutes = Math.floor(millis / 60000),
        seconds = ((millis % 60000) / 1000).toFixed(0);

    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
};

const TrackSoundCloud = React.createClass({

    handler(e){

        let uri = this.props.item.uri + '/stream?client_id=' + soundCloud.clientId,
            $track = $(e.target).closest('.sound-track'),
            index = $track.index();

        $('.sound-track:not(:eq('+index+'))').removeClass('active play');

        $track.addClass('active');

        if ($track.hasClass('play')) {

            $track.removeClass('play');
            this.props.pause();
            return false;
        }

        this.props.setCurrentIndex(index);
        this.props.setTrack(uri);
        this.props.play();

        $track.addClass('play');
    },

    render(){

        return (
            <div className="sound-track">
                <div className="sound-track__play-pause" onClick={this.handler}></div>
                <div className="sound-track__artist-name">{this.props.item.title}</div>
                <div className="sound-track__controls">
                    <div className="sound-track__duration">{duration(this.props.item.duration)}</div>
                </div>
            </div>
        );
    }
});

export default connect(
    state => ({
        url: state.source
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