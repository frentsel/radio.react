import $ from 'jquery';

const http = {
	ajaxSpinner: function (status) {
		$('body').toggleClass('loading', status);
	},
	cache: {},
	getJSON: function (path, params) {
		return this.get(path, params, 'json');
	},
	get: function (path, _params, type) {

		var _this = this,
			params = _params || {},
			cacheKey = path + $.param(params);

		return new Promise(function (resolve, reject) {

			if(_this.cache[cacheKey] !== undefined) {
				resolve(_this.cache[cacheKey]);
				return false;
			}

			$.ajax({
				url: path,
				type: 'get',
				dataType: type || 'text',
				data: params,
				beforeSend: function() {
					_this.ajaxSpinner(true);
				},
				complete: function(){
					_this.ajaxSpinner(false);
				},
				success: function (response) {
					_this.cache[cacheKey] = response;
					resolve(response);
				},
				error: function (e) {
					reject(e);
					console.error(arguments);
				}
			});
		});
	}
};

export default http;