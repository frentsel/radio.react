import {combineReducers} from 'redux';
import { routerReducer } from 'react-router-redux';

import stations from './stations';
import player from './player';
import source from './source';
import meta from './meta';
import playlist from './playlist';

export default combineReducers({
	routing: routerReducer,
	stations,
	meta,
	source,
	playlist,
	player
});