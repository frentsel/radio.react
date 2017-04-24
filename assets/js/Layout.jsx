import React from 'react';
import {Router, Route, hashHistory, Link} from 'react-router';

import Sidebar from './partials/Sidebar.jsx';
import AudioPlayer from './AudioPlayer.jsx';
import Search from './partials/search.jsx';

const Layout = ({src, children}) => {

	return (
		<div id="wrapper">
			<nav>
				<div className="nav-section-left">
					<Link to={'/'}>Home</Link>
					<ul>
						<li><Link to={'/about'}>About</Link></li>
						<li><Link to={'/contacts'}>Contacts</Link></li>
					</ul>
				</div>
				<Search />
			</nav>
			<div id="container">
				<Sidebar />
				<div id="content">
					{children}
				</div>
			</div>
			<AudioPlayer></AudioPlayer>
{/*			<div className="linear-activity">
				<div className="indeterminate"></div>
			</div>*/}
		</div>
	);
};

export default Layout;