import React from 'react';

const DisqusBlock = ({ url, identifier, title }) => {

	window.disqus_config = function () {
		this.page.url = url;
		this.page.identifier = identifier;
		this.page.title = title;
	};

	(function () {

		var d = document,
			s = d.createElement('script');

		s.src = '//cishophostenkocom.disqus.com/embed.js';

		s.setAttribute('data-timestamp', +new Date());
		(d.head || d.body).appendChild(s);
	})();

	return (
		<div id="disqus_thread"></div>
	);
};

export default DisqusBlock;