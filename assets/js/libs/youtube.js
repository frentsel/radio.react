'use strict';

import Http from './http';
import $ from 'jquery';

const youtube = {
	apiKey: 'AIzaSyDkpmmvSxy8sfl0eO7eztvgMhy6m93V76s',
	pageToken: '',
	reloadCounter: 0,
	instance: {},
	utils: {
		getDuration: function (duration) {

			var match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/),
				hours = (parseInt(match[1]) || 0),
				minutes = (parseInt(match[2]) || 0),
				seconds = (parseInt(match[3]) || 0);

			seconds = seconds < 10 ? "0" + seconds : seconds;

			return hours ? (hours + ":" + minutes + ":" + seconds) : (minutes + ":" + seconds);
		},
		changeDataFormat: function (data, callback) {

			var result = [],
				name;

			data.items.map(function (el, n) {
				name = el.snippet.title.split(' - ');
				result.push({
					aid: el.id,
					artist: name[0],
					genre: '',
					owner_id: 0,
					title: name[1],
					url: "//www.youtubeinmp3.com/fetch/?video=https://www.youtube.com/watch?v=" + el.id,
					duration: this.getDuration(el.contentDetails.duration)
				});
			});

			callback(result);
		}
	},
	reset: function () {
		this.pageToken = '';
	},
	getByName: function (q, callback) {

		var params = {
			part: 'snippet',
			maxResults: 50,
			q: q,
			key: this.apiKey,
			type: "video",
			videoCategoryId: 10
		};

		this.query(params, callback);
	},
	getByArtistName: function (_params, callback) {

		var _this = this;
		var params = {
			part: 'snippet',
			mime: true,
			pageToken: this.pageToken,
			key: this.apiKey,
			type: "video",
			videoCategoryId: 10
		};

		$.extend(params, _params);

		this.query(params, function (data) {

			if (data) {
				_this.pageToken = data.nextPageToken;

				var IDs = data.items.map(function (el) {
					return el.id.videoId
				}).join(',');

				_this.videos(IDs, function (dataInfo) {

					_this.utils.changeDataFormat(dataInfo, function (items) {
						callback(items);
					});
				});
			}
		});
	},
	search: function (q, callback) {

		var params = {
			part: 'snippet',
			mime: true,
			maxResults: 30,
			pageToken: this.pageToken,
			q: q,
			key: this.apiKey,
			type: "video",
			videoCategoryId: 10
		};
		var _this = this;

		this.query(params, function (data) {

			if (data) {
				_this.pageToken = data.nextPageToken;

				var IDs = data.items.map(function (el) {
					return el.id.videoId
				}).join(',');

				_this.videos(IDs, function (result) {

					data.items.map(function (el, n) {
						el.contentDetails = result.items[n].contentDetails;
					});

					callback(data);
				});
			}
		});
	},
	news: function (playlistId, offset, callback) {

		var _this = this;
		var params = {
			playlistId: playlistId,
			part: 'snippet,id',
			key: this.apiKey,
			pageToken: this.pageToken,
			//order: 'date',
			maxResults: 30
		};

		Http.getJSON('https://www.googleapis.com/youtube/v3/playlistItems', params, function (data) {

			if (data.pageInfo.totalResults <= offset) {
				callback(false);
				return false;
			}

			_this.pageToken = data.nextPageToken;

			var IDs = data.items.map(function (el) {
				return el.snippet.resourceId.videoId;
			}).join(',');

			if (!IDs.length && _this.reloadCounter < 1) {
				_this.reloadCounter++;
				_this.news(playlistId, callback);
				console.info("youtube.news has been reloaded: ", _this.reloadCounter);
				return false;
			}

			_this.reloadCounter = 0;
			_this.videos(IDs, function (result) {

				data.items.map(function (el, n) {
					el.contentDetails = result.items[n].contentDetails;
				});

				callback(data);
			});

		}, 'cacheTrue');
	},
	play: function (track) {

		var _this = this;
		var params = {
			q: decodeURIComponent(track),
			maxResults: 2,
			part: "id",
			type: "video",
			key: this.apiKey
		};

		console.info("this.instance: ", this.instance);

		Http.getJSON('https://www.googleapis.com/youtube/v3/search', params, function (data) {
			_this.instance.loadVideoById(data.items[0].id.videoId);
		});
	},
	videos: function (IDs, callback) {

		var params = {
			part: 'snippet,contentDetails',
			key: this.apiKey,
			id: IDs
		};

		Http.getJSON('https://www.googleapis.com/youtube/v3/videos', params, function (data) {
			callback(data);
		}, 'cacheTrue');
	},
	query: function (params, callback) {

		Http.getJSON('https://www.googleapis.com/youtube/v3/search', params).then(callback);
	},
	updateBar: function () {

		if (this.instance.getPlayerState() === 1) {
			$(".jp-seek-bar").css({width: this.instance.getVideoLoadedFraction() * 100 + '%'});
			$(".jp-play-bar").css({width: (this.instance.getCurrentTime() / this.instance.getDuration()) * 100 + '%'});

			setTimeout(this.updateBar.bind(this), 200);
		}

		if (this.instance.getPlayerState() === 5)
			$(".jp-seek-bar, .jp-play-bar").css({width: 0});
	},
	init: function (name) {

		var _this = this;

		// setTimeout(function () {
		//
		// 	_this.instance = new YT.Player("videoFrame", {
		// 		playerVars: {
		// 			autoplay: 0,
		// 			rel: 0,
		// 			showinfo: 0,
		// 			egm: 0,
		// 			showsearch: 0,
		// 			controls: 0,
		// 			modestbranding: 1,
		// 			iv_load_policy: 3,
		// 			disablekb: 1,
		// 			version: 3
		// 		},
		// 		height: 320,
		// 		width: 400,
		// 		videoId: 'gEPmA3USJdI',
		// 		events: {
		// 			onReady: function (event) {
		// 				console.info("onReady!", event);
		// 			}, onError: function (r) {
		// 				console.info("onError!");
		// 			}, onStateChange: function (state) {
		//
		// 				if(state.data === 0){
		// 					App.next();
		// 				}
		//
		// 				_this.updateBar();
		// 				console.info("onStateChange!");
		// 			}
		// 		}
		// 	});
		//
		// 	$(document).on('click', '.jp-progress', function(e){
		//
		// 		var progress = 517,
		// 			percent = ( e.offsetX / progress ) * 100,
		// 			seek = (_this.instance.getDuration() / 100) * percent;
		//
		// 		_this.instance.seekTo(seek, true);
		//
		// 		$(".jp-play-bar").css({width: percent + '%'});
		// 	});
		//
		// }, 500);

		delete this.init;
		window[name] = this;
	}
};

export default youtube;