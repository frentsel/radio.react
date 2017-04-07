import http from './http';
import $ from 'jquery';

const meta = (function () {

	var settings = {
		format: 'json',
		api_key: '02ec4e9d3a6dec29749f9d0a2cf3f598'
	};

	var getTrackInfo = function (stationId) {

		return new Promise(function (resolve, reject) {

			http.getJSON('/server/meta.php', {id: stationId})
				.then(function (data) {
					const artist = data.track.split('-').shift().trim();
					getArtistInfo(artist, resolve);
				})
				.catch(reject);
		});
	};

	var getTrackInfoByURL = function (url) {

		return new Promise(function (resolve, reject) {

			http.getJSON('/server/meta.php', {url: url})
				.then(resolve)
				.catch(reject);
		});
	};

	var find = function (q, callback) {

		$.extend(settings, {
			artist: q,
			limit: 8,
			method: 'artist.search'
		});

		get(settings, callback);
	};

	var getTopArtists = function (tag, offset, callback) {

		var limit = 30;
		var page = offset === 0 ? 1 : offset / limit + 1;

		$.extend(settings, {
			method: 'tag.gettopartists',
			tag: tag,
			page: page,
			limit: limit
		});

		get(settings, callback);
	};

	var getArtistInfo = function (artist, callback) {

		$.extend(settings, {
			method: 'artist.getinfo',
			autocorrect: 1,
			artist: artist,
			lang: "ru"
		});

		get(settings, callback);
	};

	var getAlbum = function (artist, album, callback) {

		$.extend(settings, {
			method: 'album.getinfo',
			artist: artist,
			lang: "ru",
			album: album
		});

		get(settings, callback);
	};

	var getTopAlbums = function (artist, callback) {

		$.extend(settings, {
			method: 'artist.gettopalbums',
			artist: artist,
			limit: 100
		});

		get(settings, callback);
	};

	var getTopArtistTracks = function (artist, callback) {

		$.extend(settings, {
			method: 'artist.gettoptracks',
			artist: artist,
			autocorrect: 1,
			limit: 100
		});

		get(settings, callback);
	};

	var getAllTopArtists = function (offset, callback) {

		var limit = 52,
			page = offset === 0 ? 1 : offset / limit + 1;

		$.extend(settings, {
			method: 'chart.getTopArtists',
			page: page,
			limit: limit
		});

		get(settings, callback);
	};

	var getTopTracks = function (category, callback) {

		$.extend(settings, {
			method: 'tag.gettoptracks',
			tag: category,
			limit: 100
		});

		get(settings, function (data) {
			callback(data);
		});
	};

	var get = function (params, callback) {

		http.getJSON('http://ws.audioscrobbler.com/2.0/', params)
			.then(callback);
	};

	return {
		init: function (settings) {
			//getGenres();
		},
		getAlbum: getAlbum,
		getTrackInfo: getTrackInfo,
		getTrackInfoByURL: getTrackInfoByURL,
		getTopArtistTracks: getTopArtistTracks,
		getTopAlbums: getTopAlbums,
		getTopTracks: getTopTracks,
		getAllTopArtists: getAllTopArtists,
		getTopArtists: getTopArtists,
		getArtistInfo: getArtistInfo,
		find: find
	}
})();

export default meta;