'use strict';

import Http from './http';
import $ from 'jquery';

const SoundCloud = {
	clientId: "",
	extUsers: [
		// {clientId: "6258af195c54638ee7380c3a18016cee"},
		// {clientId: "ca2ae09adbc25a250a7780016a89d454"},
		{clientId: "d8e1be45275edc853761bb5fb863a978"},
		// {clientId: "fa9d90e090555a0b1c66676a58da1c6b"},
		{clientId: "0003ff46a40e372ae64200f9f5445457"}
	],
	data: [],
	getClientId: function () {

		var randKey = Math.floor(Math.random() * this.extUsers.length);
		this.clientId = this.extUsers[randKey].clientId;
		return this.clientId;
	},
	server: {
		url: '/core/proxy.php'
	},
	get: {
		tracks: function (params, callback) {

			var id = SoundCloud.getClientId();
			$.extend(params, {
				limit: 100,
				linked_partitioning: 1,
				consumer_key: id
			});

			Http.getJSON('https://api.soundcloud.com/v1/tracks', params)
				.then(callback);
		},
		track: function (name, callback) {

			var id = SoundCloud.getClientId();
			var params = {
				q: name,
				limit: 2,
				consumer_key: id
			};

			Http.getJSON('https://api.soundcloud.com/v1/tracks', params, function (data) {
				callback(data);
			}, 'cacheTrue');
		},
		category: function (params, callback) {

			var id = SoundCloud.getClientId();
			$.extend(params, {
				kind: "top",
				client_id: id,
				limit: 100
			});

			var url = encodeURIComponent('https://api-v2.soundcloud.com/charts?') + $.param(params);

			Http.getJSON(SoundCloud.server.url, {url: url}, function (data) {
				callback(data);
			}, 'cacheTrue');
		}
	}
};

export default SoundCloud;