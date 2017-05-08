import React from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';

const Hml5AudioPlayer = React.createClass({

    showLoader() {
        if (this.props.src.length) {
            $('body').addClass('streamLoading');
        }
    },

    hideLoader() {
        $('body').removeClass('streamLoading');
    },

    render(){

        if (this.props.src.length && this.props.player === 'play') {
            document.getElementById('audio').play();
        }

        if (this.props.player === 'pause') {
            document.getElementById('audio').pause();
        }

        return (
            <div id="playerWrapper">
                <div className="meter">
                    <span />
                </div>
                <audio id="audio" src={this.props.src} controls
                       autoPlay={this.props.player === 'play'}
                       onPlay={this.props.play}
                       onPause={this.props.pause}
                       onEnded={this.props.end}
                       onLoadStart={this.showLoader}
                       onCanPlayThrough={this.hideLoader} />
            </div>
        );
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
)(Hml5AudioPlayer);