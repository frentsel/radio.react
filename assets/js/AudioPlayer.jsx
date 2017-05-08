import React from 'react';
import {connect} from 'react-redux';
import Hml5AudioPlayer from './partials/Hml5AudioPlayer.jsx';

const AudioPlayer = React.createClass({

    componentDidMount(){

        // 2. This code loads the IFrame Player API code asynchronously.
        var tag = document.createElement('script');

        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        // 3. This function creates an <iframe> (and YouTube player)
        //    after the API code downloads.
        var player;

        function onYouTubeIframeAPIReady() {
            player = new YT.Player('player', {
                height: '360',
                width: '640',
                videoId: 'M7lc1UVf-VE',
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });
        }

        // 4. The API will call this function when the video player is ready.
        function onPlayerReady(event) {
            event.target.playVideo();
        }

        // 5. The API calls this function when the player's state changes.
        //    The function indicates that when playing a video (state=1),
        //    the player should play for six seconds and then stop.
        var done = false;

        function onPlayerStateChange(event) {
            if (event.data == YT.PlayerState.PLAYING && !done) {
                setTimeout(stopVideo, 6000);
                done = true;
            }
        }

        function stopVideo() {
            player.stopVideo();
        }
    },

    render(){

        const src = this.props.src,
            player = this.props.player,
            play = this.props.play,
            pause = this.props.pause,
            end = this.props.end;

        if (!src.length)
            return <Hml5AudioPlayer src={src}/>;

        if (src.indexOf('www.youtube.com/embed') !== -1)
            return <iframe id="youtubePlayer" width="250" height="141"
                           src={src + '?enablejsapi=1&autoplay=1'}></iframe>;

        return <Hml5AudioPlayer src={src} player={player} play={play} pause={pause} end={end}/>;
    }
});

export default connect(
    state => ({
        src: state.source,
        player: state.player
    }),
    dispatch => ({
        play: () => {
            dispatch({
                type: 'PLAY'
            });
        },
        pause: () => {
            dispatch({
                type: 'PAUSE'
            });
        },
        end: () => {
            dispatch({
                type: 'END'
            });
        }
    })
)(AudioPlayer);