import React from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';

const Track = ({item, setTrack}) => {

    const uri = item.uri;

    const handler = (e) => {
        $('.sound-track').removeClass('active play');
        $(e.target).closest('.sound-track').addClass('active play');
        setTrack(uri);
    };

    return (
        <div className="sound-track">
            <div className="sound-track__play-pause" onClick={handler}></div>
            <div className="sound-track__artist-name">{item.artist.name} - {item.name}</div>
        </div>
    );
};

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
        }
    })
)(Track);