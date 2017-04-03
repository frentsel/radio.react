import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

import Layout from './Layout.jsx';
import Home from './pages/Home.jsx';
import Station from './pages/Station.jsx';
import City from './pages/City.jsx';
import Cities from './pages/Cities.jsx';
import Countries from './pages/Countries.jsx';
import Country from './pages/Country.jsx';
import Genre from './pages/Genre.jsx';
import Artist from './pages/Artist.jsx';
import NotFound from './pages/NotFound.jsx';

import '../less/main.less';

import reducers from './reducers';
const store = createStore(reducers);
const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<Route component={Layout}>
				<Route path="/" component={Home}></Route>
				<Route path="/radio-genre/:genreId" component={Genre}></Route>
				<Route path="/radio-cities" component={Cities}></Route>
				<Route path="/radio-city/:cityId" component={City}></Route>
				<Route path="/radio-countries" component={Countries}></Route>
				<Route path="/radio-country/:countryId" component={Country}></Route>
				<Route path="/radio-station/:stationId" component={Station}></Route>
				<Route path="/artist-info/:artistName" component={Artist}></Route>
				<Route path="*" component={NotFound}></Route>
			</Route>
		</Router>
	</Provider>,
	document.querySelector('#app')
);