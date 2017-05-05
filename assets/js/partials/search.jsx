import React from 'react';
import $ from 'jquery';
import {Router, Route, hashHistory, Link} from 'react-router';
import meta from '../libs/meta';

const Search = React.createClass({

    getInitialState(){
        return {
            q: '',
            artists: [],
            dropDown: false
        }
    },

    submit(e){
        e.preventDefault();
        console.info("submit: ", e);
    },

    reset(e){

        $(e.target)
            .closest('form')
            .removeClass('clear-active');

        this.setState({
            q: '',
            artists: [],
            dropDown: true
        });
    },

    blur(e){
        setTimeout(() => {
            this.state.dropDown = false;
            this.setState(this.state);
        }, 100);
    },

    hideDropDown(artistName){
        this.state.dropDown = false;
        this.state.q = artistName;
        this.setState(this.state);
    },

    handler(e){

        const q = e.target.value;

        $(e.target)
            .closest('form')
            .toggleClass('clear-active', q.length > 0);

        this.state.q = q;
        this.state.dropDown = !!q.length;

        this.setState(this.state);

        if(!q.length) return false;

        meta.find(q, (data) => {

            this.state.artists = data.results.artistmatches.artist;
            this.state.dropDown = true;

            this.setState(this.state);
        });
    },

    setDefaultImage (e) {
        e.target.src = "/img/placeholder-image.png";
    },

    render(){

        const artists = this.state.artists.map((artist, n) =>
            <Link to={'/artist-bio/' + artist.name} className="search-result-artist" key={n}
                  onClick={this.hideDropDown.bind(this, artist.name)}>
                <img src={artist.image[0]['#text']} alt={artist.name} onError={this.setDefaultImage}/>
                <span>{artist.name}</span>
            </Link>
        );

        return (
            <div id="searchSection">
                <form onSubmit={this.submit} className="search-form">
                    <input type="text" value={this.state.q} autoFocus className="search-field" onInput={this.handler} onBlur={this.blur}/>
                    <button className="search-reset-button" onClick={this.reset}>
                        <i className="fa fa-times" aria-hidden="true"></i>
                    </button>
                    <button className="search-submit-button" onClick={this.submit}>
                        <i className="fa fa-search"></i>
                    </button>
                </form>
                {this.state.dropDown && <div className="search-drop-down">{artists}</div>}
            </div>
        );
    }
});

export default Search;