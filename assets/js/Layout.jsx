import React from 'react';
import {Router, Route, hashHistory, Link} from 'react-router';

import Sidebar from './partials/Sidebar.jsx';
import AudioPlayer from './AudioPlayer.jsx';
import Search from './partials/search.jsx';

const Layout = ({children}) => {

    return (
        <div id="wrapper">
            <nav>
                <div className="nav-section-left">
                    <ul>
                        <li><Link to={'/'}>Home</Link></li>
                        <li><Link to={'/about'}>About</Link></li>
                        <li><Link to={'/contact'}>Contact</Link></li>
                        <li><Link to={'/news'}>News</Link></li>
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
            <AudioPlayer />
            {/*			<div className="linear-activity">
             <div className="indeterminate"></div>
             </div>*/}
        </div>
    );
};

export default Layout;