import React from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';
import toastr from 'toastr';

const Hml5AudioPlayer = React.createClass({

    showLoader() {
        if (this.props.src.length) {
            $('body').addClass('streamLoading');
        }
    },

    hideLoader() {
        $('body').removeClass('streamLoading');
    },

    errorHandler(e) {

        if(!e.target.src.includes(window.location.origin)) {

            toastr.remove();
            toastr.options.progressBar = true;
            toastr.error("MediaError, code: 4", 'Error', {
                closeButton: true,
                progressBar: true,
            });

            this.hideLoader();
        }
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
                       onError={this.errorHandler}
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